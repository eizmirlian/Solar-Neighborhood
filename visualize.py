import matplotlib.pyplot as plt
from pymongo import MongoClient
from bson.objectid import ObjectId
import numpy as np


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
            i += 1
            if (lat > item["Location"][0] and lat < item["Location"][0] + self.width and 
                long > item["Location"][1] and long < item["Location"][1] + self.width):
                j = 0
                for appliance in appliances:
                    total += sum(item[appliance])
                    hourTotal = np.add(hourTotal, item[appliance])
                    j += 1
        total = total / i
        totals.set_title("Average Total Usage")
        totals.bar("total", total)
        hourly.set_title("Average Hourly Usage Per Appliance")
        hourTotal = hourTotal / i
        hourly.plot(y, hourTotal)
        hourly.set_title("Average Hourly Usage")
        fig.show()
        plt.show()
    
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
        totals.bar(appliances, total) 
        for appliance in hour:
            hourly.plot(y, appliance)
        fig.show()
        plt.show()

data = dataVisualization()
location = [129, 217]
id = ObjectId('63538ba5a01d881466df8942')
data.getUserData(id)
data.getCorporateData(location)