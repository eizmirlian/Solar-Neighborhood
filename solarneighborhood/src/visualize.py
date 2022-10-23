from selenium import webdriver
import matplotlib.pyplot as plt
import mpld3
from pymongo import MongoClient
from bson.objectid import ObjectId
import numpy as np
from selenium.webdriver.firefox.options import Options

appliances = ["Oven", "TV"]
class dataVisualization:
    def __init__ (self, width = 50, connectionString = "mongodb+srv://pf48724:solarneighborhood@cluster0.7uvnr60.mongodb.net/?retryWrites=true&w=majority"):
        self.client = MongoClient(connectionString)
        self.db = self.client.energyconsumerdatadb
        self.collection = self.db.energyconsumerdata
        self.width = 50

    def getCorporateData(self, location):
        lat = location[0]
        long = location[1]
        item_details = self.collection.find()
        fig, (totals, hourly)= plt.subplots(2)
        fig.tight_layout(pad = 3)
        total = 0#np.array([0] * len(appliances))
        hourTotal = np.array([0] * 24)
        y = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
        i = 0
        for item in item_details:
            if (lat < item["Location"][0] and lat + self.width > item["Location"][0] and 
                long < item["Location"][1] and long + self.width > item["Location"][1]):
                i += 1
                j = 0
                for appliance in appliances:
                    total += sum(item[appliance])
                    hourTotal = np.add(hourTotal, item[appliance])
                    j += 1
        if i != 0:
            total = total / i
            totals.set_title("Average Total Usage")
            totals.bar("total", total)
            hourly.set_title("Average Hourly Usage Per Appliance")
            hourTotal = hourTotal / i
            hourly.plot(appliances, hourTotal)
            hourly.set_title("Average Hourly Usage")
            html_str  = mpld3.fig_to_html(fig)
            Html_file = open("CorporateData.html", "w")
            Html_file.write(html_str)
            Html_file.close()
            fig.show()
            mpld3.show()
    
    def getUserData(self, id):
        item_details = self.collection.find()
        fig, (totals, hourly) = plt.subplots(2)
        hour = [np.array([0] * 24)] * len(appliances)
        total = np.array([0] * len(appliances))
        y = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"]
        for item in item_details:
            if item['_id'] != id:
                continue
            j = 0
            for appliance in appliances:
                hour[j] = np.add(item[appliance], hour[j])
                total[j] = np.sum(item[appliance])
                j += 1
        totals.bar(["ha", "b"], total) 
        for appliance in hour:
            hourly.plot(y, appliance)
        hourly.legend(appliances)
        fig.show()
        html_str  = mpld3.fig_to_html(fig)
        Html_file = open("UserData.html", "w")
        Html_file.write(html_str)
        Html_file.close()
        mpld3.show()

    def getSolarSavings(self, id):
        item_details = self.collection.find()
        for item in item_details:
            if item['_id'] != id:
                continue
            options = Options()
            options.headless = True
            d = webdriver.Firefox(options=options)
            lat = format(item["Location"][0], '.7f')
            long = format(item["Location"][1], '.7f')
            totalWH = 0
            for appliance in appliances:
                totalWH += sum(item[appliance])
            url = 'https://psc.ga.gov/utilities/electric/georgia-power-bill-calculator/'
            d.get(url)
            elements =  d.find_element("xpath", './/span[@id = "srsTierOne"]')
            tier1Price = elements.get_attribute("innerText")
            tier1Price = float(tier1Price[2:len(tier1Price)])
            elements =  d.find_element("xpath", './/span[@id = "srsTierTwo"]')
            tier2Price = elements.get_attribute("innerText")
            tier2Price = float(tier2Price[2:len(tier2Price)])
            elements =  d.find_element("xpath", './/span[@id = "srsTierThree"]')
            tier3Price = elements.get_attribute("innerText")
            tier3Price = float(tier3Price[2:len(tier3Price)])
            bill = 0
            if totalWH > 1000:
                bill = 650 * tier1Price + 350 * tier2Price + (1000 - totalWH) * tier3Price
            elif totalWH > 650:
                bill = 650 * tier1Price + 350 * (totalWH - 650) * tier2Price
            else:
                bill = totalWH * tier1Price

            url = 'https://sunroof.withgoogle.com/building/{}/{}/#?f=buy&b={}'.format(lat, long, bill) 
            d.get(url)
            elements = d.find_elements("css selector", '.panel-fact-text')
            sunlightHours = elements[0].get_attribute("innerText")
            availableSpace = elements[1].get_attribute("innerText")
            elements = d.find_element("css selector", ".recommended-kw")
            recomendedSize = elements.get_attribute("innerText")
            try:
                elements = d.find_element("css selector", ".panel-estimate-savings")
            except:
                elements = d.find_element("css selector", ".panel-estimate-caption")
            savings = elements.get_attribute("innerText")

            d.close()
            return sunlightHours, availableSpace, recomendedSize, savings

data = dataVisualization()
location = [37, -91]
id = ObjectId('63538ba5a01d881466df8942')
data.getUserData(id)
data.getCorporateData(location)
print(data.getSolarSavings(id))
