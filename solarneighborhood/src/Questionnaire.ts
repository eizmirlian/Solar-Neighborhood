import {Appliances} from "./src/appliances/Appliances.ts";
import {WeeklyAppliances} from "./appliances/WeeklyAppliances.ts";
import {DailyAppliances} from "./appliances/DailyAppliances.ts";
import {AlwaysAppliances} from "./appliances/AlwaysAppliances.ts";
import {QuestionnairePage} from "./QuestionnairePage";


export class Questionnaire {
    public appliance_list: Appliances[] = [new AlwaysAppliances("Fridge", 15), new DailyAppliances("Microwave", 20), new WeeklyAppliances("Oven", 20)];
    
    public Questionnaire() {
        console.log("in constructor");
        console.log("constructor");
        }

    public Questions() {
        console.log("HE");
        var q = new QuestionnairePage(this.appliance_list);
        q.render();
        
    }
}
