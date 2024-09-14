import { useLoaderData } from "react-router-dom";
import Layout from './Layout';

import "./game.css"

import tower_1 from "./data/tower_1.json";
import tower_2 from "./data/tower_2.json";
import elevator_map from "./data/elevator_map.json";
import React from "react";

const towers = [tower_1, tower_2];

export async function loader({ params }) {
    return { params };
}

function Game() {
    const { params } = useLoaderData();
    const tower = towers[params.tower - 1];

    let floor = params.floor;
    if (!floor) {
        floor = "C";
    }

    function generateElevatorTitle(elevatorKey){
        const splitElevator = elevatorKey.split(":");
        const splitZone = splitElevator[0].split("_");
        const splitBank = splitElevator[1].split("_");

        let zone = splitZone[1];
        let bank = splitBank[1];

        if(splitElevator[0] === "shuttles" && splitElevator[1] === "express") {
            return `Express To Outdoor Observatory`;
        } else if(splitElevator[0] === "shuttles") {
            return `Shuttle to Zone ${bank}`;
        } else if(splitElevator[1] === "local") {
            return `Zone 1, Bank L`;
        } else {
            return `Zone ${zone}, Bank ${bank.toUpperCase()}`;
        }
    }

    function generateElevatorLink(elevatorKey){
        const splitElevator = elevatorKey.split(":");
        const accessableFloors = elevator_map[splitElevator[0]][splitElevator[1]];

        return (
            <div style={{
                display: 'inline-block',
                border: '1px solid black',
                padding: '1px 6px 3px 0px',
                minHeight: '15ch'
            }}>
                <ul style={{listStyleType: 'initial'}}>
                    {accessableFloors.map((elevator_floor) => {
                        if(floor === elevator_floor){
                            return;
                        }
                        return (
                            <a href={`/game/${params.tower}/${elevator_floor}`} style={{
                                textDecoration: 'none',
                                color: 'black'
                            }}>
                                <li className={"elevator_button"} key={elevator_floor}>{elevator_floor}</li>
                            </a>
                    )
                        ;
                    })}
                </ul>
            </div>
        )
    }

    function generateStairs(){
        if(floor === "L"){
            return (
                <div>
                    <a href={`/game/${params.tower}/1`}>Go Up</a> | <a href={`/game/${params.tower}/C`}>Go Down</a>
                </div>
            );
        } else if(floor === "C"){
            return (
                <div>
                    <a href={`/game/${params.tower}/L`}>Go Up</a> | <a href={`/game/${params.tower}/B`}>Go Down</a>
                </div>
            );
        } else if(floor === "B"){
            return (
                <div>
                    <a href={`/game/${params.tower}/C`}>Go Up</a>
                </div>
            );
        } else if(floor === "110"){
            return (
                <div>
                    <a href={`/game/${params.tower}/109`}>Go Down</a>
                </div>
            );
        } else if(floor === "1"){
            return (
                <div>
                    <a href={`/game/${params.tower}/2`}>Go Up</a> | <a href={`/game/${params.tower}/L`}>Go Down</a>
                </div>
            );
        } else {
            const minusOne = parseInt(floor) - 1;
            const plusOne = parseInt(floor) + 1;
            return (
                <div>
                    <a href={`/game/${params.tower}/${plusOne}`}>Go Up</a> | <a href={`/game/${params.tower}/${minusOne}`}>Go Down</a>
                </div>
            );
        }
    }

    function generateElevator(index, key){
        if(key !== "stair_access"){
            return (
                    <td key={key}>
                        <div style={{
                            border: '1px solid black',
                            margin: '5px',
                            padding: '5px',
                            width: '12ch',
                            height: '28ch',
                            textAlign: 'center',
                        }}>
                            <b>Elevator {index + 1}
                                <hr/>
                                {generateElevatorTitle(key)}</b>
                            <hr/>
                            {generateElevatorLink(key)}
                        </div>
                    </td>
            );
        }
    }

    function generateElevatorRow(i, elevators){
        if(elevators[i+1]){
            return (
                <tr>
                    {generateElevator(i, elevators[i])}
                    {generateElevator(i+1, elevators[i+1])}
                </tr>
            )
        }
        return (
            <tr>
                {generateElevator(i, elevators[i])}
            </tr>
        )
    }

    function generateNavigation(floor) {
        const otherTower = params.tower === "1" ? "2" : "1";
        console.log("joey", params.tower, otherTower)
        const items = [
            <a href="/map/elevators">Read the map</a>,
            <a href={`/map/directory/tower${params.tower}`}>WTC {params.tower} Directory</a>,
        ];
        if(floor === "C"){
            items.push(<a href={`/game/${otherTower}`}>Go to WTC {otherTower}</a>);
        }

        return items.map((item, index) => {
            if (index === items.length - 1) {
                return <span key={item}>{item}</span>;
                }
            return <span key={item}>{item} | </span>;
        });
    }

    function generateImpacted(impacted){
        if(impacted) {
            const airline = params.tower === "1" ?
                <a href={"https://en.wikipedia.org/wiki/American_Airlines_Flight_11"}>American Airlines Flight 11</a> :
                <a href={"https://en.wikipedia.org/wiki/United_Airlines_Flight_175"}>United Airlines Flight 175</a>;
            return (
                <div style={{
                    backgroundColor: 'red',
                    padding: '5px',
                    borderRadius: '10px',
                    maxWidth: '50ch',
                    margin: '0 auto'
                }}>
                    <h3>Impacted</h3>
                    <p>
                        This floor was directly impacted by {airline} on September 11, 2001.
                    </p>
                </div>
            );
        }
    }

    function generateTrapped(trapped) {
        if (trapped) {
            const airline = params.tower === "1" ?
                <a href={"https://en.wikipedia.org/wiki/American_Airlines_Flight_11"}>American Airlines Flight 11</a> :
                <a href={"https://en.wikipedia.org/wiki/United_Airlines_Flight_175"}>United Airlines Flight 175</a>;
            return (
                <div style={{
                    backgroundColor: 'red',
                    padding: '5px',
                    borderRadius: '10px',
                    maxWidth: '50ch',
                    margin: '0 auto'
                }}>
                    <h3>Trapped</h3>
                    <p>
                        This floor was trapped after impact by {airline} on September 11, 2001.
                    </p>
                </div>
            );
        }
    }

    return (
        <Layout header={`Welcome to WTC ${params.tower}`}>
            <h3>You are currently on floor {floor}.</h3>
            <div>
                {generateImpacted(tower.floors[floor].impacted)}
                {generateTrapped(tower.floors[floor].trapped)}
            </div>
            <p>
                <h3>You can visit:</h3>
                <div style={{textAlign: 'left', width: '35ch', display: 'inline-block'}}>
                    <ul>
                        {tower.floors[floor].directory.map((company) => {
                            if (company.wikiPage) {
                                return (
                                    <li key={company.name}><a href={company.wikiPage}>{company.name}</a></li>
                                );
                            }
                            return (
                                <li key={company.name}>{company.name}</li>
                            );
                        })}
                    </ul>
                </div>
                <h3>Or take the elevator/stairs:</h3>
                <div>
                    {generateNavigation(floor)}
                    <br/><br/><b>Stairs</b>
                    {generateStairs()}
                </div>
                <div style={{textAlign: 'center'}}>
                    <table style={{marginLeft: 'auto', marginRight: 'auto'}}>
                        {tower.floors[floor].elevators.map((elevatorKey, index) => {
                            if (index % 2 === 0) {
                                return generateElevatorRow(index, tower.floors[floor].elevators);
                            }
                        })}
                    </table>
                </div>
            </p>
        </Layout>
    );
}

export default Game;
