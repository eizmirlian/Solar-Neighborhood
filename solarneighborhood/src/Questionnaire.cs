from appliances import *;
import "./QuestionnairePage.js"

namespace ConsumerClasses;

class Questionnaire {
    public Appliances[] appliance_list = [];
    
    public Questionnaire() {
        QuestionnairePage q = new QuestionnairePage(appliance_list);
        q.build_page();
    }
}