import "./Questionnaire.css";
import TimePicker from '@mui/lab/TimePicker';


export class QuestionnairePage extends Component {
    constructor(appliancesList) {
        this.appliances = appliancesList;
        var appliancesArr = [];
        ViewGroup timeGroup = <ViewGroup
        style={{
            flexDirection: "row",
            height: 100,
            padding: 20
            }}>
        <TimePicker
        label = "Time"
        style = {flex = .33}
        onChange = {(newValue) => {value = newValue}}
        renderInput={(params) => <TextField {...params} />}
        />
        </ViewGroup>
        for (var i = 0; i < this.appliances.length; i++) {
            curr = this.appliance[i]
            var questions;
            if (curr.always) {
                questions = <div className = "AlwaysQuestion">
                    <p> How many {curr.name}'s do you own? </p>
                </div>
            } else if (curr.daily) {
                questions = <div className = "DailyQuestion">
                    <p> Between what hours do you use your {curr.name}?</p>
                    <ViewGroup
                    style={{
                        flexDirection: "row",
                        height: 100,
                        padding: 20
                        }}>
                    <TimePicker
                    label = "Time"
                    style = {flex = .33}
                    onChange = {(newValue) => {value = newValue}}
                    renderInput={(params) => <TextField {...params} />}
                    />
                    </ViewGroup>
                </div>
            }
            appliancesArr.push(
                <div className = "ApplianceQuestion">

                </div>
            )
        }
    }

    build_page() {
        return (
            <div className= "Questionnaire">
                
            </div>
        )
    }
}