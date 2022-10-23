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
import { resolveComponentProps } from "@mui/base";


const appliances_list = [new AlwaysAppliances("Fridge", 15), new DailyAppliances("Microwave", 20), new WeeklyAppliances("Oven", 20)];

var value = new Date('2022-10-22T4:18:54');
let timeGroup = '';
timeGroup = <div
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
  />
  <TimePicker
  label = "End Time"
  style = {{flex: .5}}
  value = {null}
  onChange = {(newValue) => {value = newValue}}
  renderInput={(params) => <TextField {...params} />}
  />
  </div>
var mast_dict = {};
var i = 0;
while (i < appliances_list.length) {
    mast_dict[i] = {0: timeGroup};
    i++;
}

function addTimes(index, time_dict = mast_dict, timeBlock = timeGroup) {
    var j = Object.keys(time_dict[i]).length;
    time_dict[i][j] = timeBlock;
}


function QuestionnairePageinit () {
    var appliances = appliances_list;
    var appliancesArr = [];

    console.log("in Render");
    for (var i = 0; i < appliances.length; i++) {
        var curr = appliances[i]
        var questions;
        var id;
        if (curr.always) {
            questions = <div className = "AlwaysQuestion">
                <p> How many {curr.name}'s do you own? </p>
            </div>;
            id = 0;
        } else if (curr.daily) {
            questions = <div className = "DailyQuestion">
                <p> Between what hours do you use your {curr.name}?</p>
            </div>;
            id = 1;
        } else if (curr.weekly) {
            questions = <div className = "WeeklyQuestion">
                <p> Between what hours do you use your {curr.name}?</p>
            </div>;
            id = 2;
        }
        appliancesArr.push((questions, id))
    }
    render(appliancesArr);
}

function render(appliancesArr) {
    const container = document.querySelector(".container")
    for(let i = 0; i < appliancesArr.length; i++){
        const questionBox = appliancesArr[i][0];
        const id = appliancesArr[0][1];
        var additionalElements = document.createElement("div");
        if (id == 0) {
            additionalElements.appendChild(
                <TextField> Enter a number </TextField>
            );
        
        } else if (id == 1) {
            for (let j = 0; j < Object.keys(mast_dict[i]).length; j++) {
                additionalElements.appendChild(mast_dict[i][j]);
            }
            additionalElements.appendChild(
                <button className = "MoreTime" onClick = {() => {
                    addTimes(i);
                    render(appliancesArr)
                    }}>Add Another Time Range</button>
            );
        } else {
            for (let j = 0; j < Object.keys(mast_dict[i]).length; j++) {
                console.log(mast_dict[i][j]);
                additionalElements.appendChild(mast_dict[i][j]);
            }
            additionalElements.appendChild(
                <button className = "MoreTime" onClick = {() => {
                    addTimes(i);
                    render(appliancesArr)
                    }}>Add Another Time Range</button>
            );
            additionalElements.appendChild(
                <div>
                    <p>How many times per week do you use it? </p>
                    <TextField>Enter a number </TextField>
                </div>
            )
        }
        
    container.appendChild(questionBox);
    container.appendChild(additionalElements);
    }
    return (
        <header className= "QuestionnaireStyle">
            {container}
            <button>Submit</button>
        </header>
    )
}

export {QuestionnairePageinit};
