import "./Questionnaire.css";
import TimePicker from '@mui/lab/TimePicker';
import React from "react";
import Component from "react";
import View from "react";
import TextField from "react";
import ScrollView from "react";
import {Appliances} from "./appliances/Appliances.ts";
import {WeeklyAppliances} from "./appliances/WeeklyAppliances.ts";
import {DailyAppliances} from "./appliances/DailyAppliances.ts";
import {AlwaysAppliances} from "./appliances/AlwaysAppliances.ts";
import { useState, useEffect } from 'react';


const appliances_list = [new AlwaysAppliances("Fridge", 15), new DailyAppliances("Microwave", 20), new WeeklyAppliances("Oven", 20)];

var value = new Date('2022-10-22T4:18:54');
let timeGroup = '';
timeGroup = <View
  style={{
      flexDirection: "row",
      height: 100,
      padding: 20
      }}>
  <TimePicker
  label = "Start Time"
  style = {{flex: .5}}
  value = {null}
  onChange = {(newValue) => {value = newValue}}
  renderInput={(params) => <TextField {...params} />}
  /><TimePicker
  label = "End Time"
  style = {{flex: .5}}
  value = {null}
  onChange = {(newValue) => {value = newValue}}
  renderInput={(params) => <TextField {...params} />}
  />
  </View>

var mast_dict = {};
var i = 0;
while (i < appliances_list.length) {
    mast_dict[i] = {0: timeGroup};
    i++;
}

function addTimes(index, time_dict = mast_dict, timeBlock = timeGroup) {
    var j = time_dict[i].keys().length;
    time_dict[i][j] = timeBlock;
}


function QuestionnairePageinit () {
    var appliances = appliances_list;
    var appliancesArr = [];

    console.log("in Render");
    for (var i = 0; i < appliances.length; i++) {
        var curr = appliances[i]
        var questions;
        var question_ids = [];
        if (curr.always) {
            questions = <div className = "AlwaysQuestion">
                <p> How many {curr.name}'s do you own? </p>
                <TextField>
                        
                </TextField>
            </div>;
            id = 0
        } else if (curr.daily || curr.weekly) {
            questions = <div className = "DailyQuestion">
                <p> Between what hours do you use your {curr.name}?</p>
                <ScrollView
                style={{
                    padding: 4
                    }}>
                    {mast_dict[i]}
                </ScrollView>
                <button onClick= {addTimes(index)}>
                    Add Another Time
                </button>
            </div>
        } if (curr.weekly) {
            questions = <div className = "WeeklyQuestion">
                <p> How many days per week do you use it?</p>

            </div>
        }
        appliancesArr.push(questions)
    }
}

function render() {
        return (
            <div className= "QuestionnaireStyle">
                {appliancesArr}
            </div>
        )
    }
}
export {QuestionnairePageinit};
