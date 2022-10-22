import {Appliances} from "./appliances/Appliances";
import {WeeklyAppliances} from "./appliances/WeeklyAppliances";
import {DailyAppliances} from "./appliances/DailyAppliances";
import {AlwaysAppliances} from "./appliances/AlwaysAppliances";
import {QuestionnairePage} from "./QuestionnairePage";


export class Questionnaire {
    public appliance_list: Appliances[] = [new AlwaysAppliances("Fridge", 15), new DailyAppliances("Microwave", 20), new WeeklyAppliances("Oven", 20)];
    
    public Questionnaire() {
        var q = new QuestionnairePage(this.appliance_list);
        q.render();
    }
}