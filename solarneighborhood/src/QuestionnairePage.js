import "./Questionnaire.css";
import TimePicker from '@mui/lab/TimePicker';
import React from "react";
import Component from 'react'
import View from "react";
import TextField from "react";
import ScrollView from "react;"


export class QuestionnairePage extends Component{
    constructor(appliancesList) {
        super();
        this.appliances = appliancesList;
        this.appliancesArr = [];
        this.state = {times: [], value: new Date('2022-10-22T4:18:54')}
    }

    render() {
        var timeGroup = <View
        style={{
            flexDirection: "row",
            height: 100,
            padding: 20
            }}>
        <TimePicker
        label = "Start Time"
        style = {{flex: .5}}
        value = {this.state.value}
        onChange = {(newValue) => React.useState({value: newValue})}
        renderInput={(params) => <TextField {...params} />}
        /><TimePicker
        label = "End Time"
        style = {{flex: .5}}
        value = {this.state.value}
        onChange = {(newValue) => React.useState({value: newValue})}
        renderInput={(params) => <TextField {...params} />}
        />
        </View>
        var AddAnother = () => {
            React.useState({times: [... this.state.times, timeGroup]});
            this.render();
        }
        for (var i = 0; i < this.appliances.length; i++) {
            var curr = this.appliance[i]
            var questions;
            this.state = {times: [timeGroup]}
            if (curr.always) {
                questions = <div className = "AlwaysQuestion">
                    <p> How many {curr.name}'s do you own? </p>
                    <TextField>
                        
                    </TextField>
                </div>
            } else if (curr.daily || curr.weekly) {
                questions = <div className = "DailyQuestion">
                    <p> Between what hours do you use your {curr.name}?</p>
                    <ScrollView
                    style={{
                        padding: 4
                        }}>
                        {this.state.times}
                    </ScrollView>
                    <button onClick= {this.AddAnother()}>
                        Add Another Time
                    </button>
                </div>
            } if (curr.weekly) {
                questions = <div className = "WeeklyQuestion">
                    <p> How many days per week do you use it?</p>

                </div>
            }
            this.appliancesArr.push(questions)
        }
        return (
            <div className= "QuestionnaireStyle">
                {this.appliancesArr}
            </div>
        )
    }
}