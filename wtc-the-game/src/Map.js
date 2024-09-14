import React from 'react';
import tower_1 from "./data/tower_1.json";
import tower_2 from "./data/tower_2.json";
import elevators from './data/elevators.png';
import Layout from "./Layout";

function Map() {
    return (
        <Layout header="Map and Company Directory">
            <p>
                <div style={{textAlign: 'left', width: '22ch', display: 'inline-block'}}>
                    <ul>
                        <li><a href="/map/elevators">Tower 1&2 Elevator Map</a></li>
                        <li><a href="/map/directory/tower1">Tower 1 Directory</a><br/></li>
                        <li><a href="/map/directory/tower2">Tower 2 Directory</a></li>
                    </ul>
                </div>
            </p>
        </Layout>
);
}

function TowerDirectory(props) {
    const tower = props.tower === "tower_1" ? tower_1 : tower_2;
    const towerID = props.tower === "tower_1" ? "1" : "2";

    return (
        <Layout header={`Tower ${towerID} Directory`}>
            <p>
                {tower.floor_order.map((floorKey) => {
                    const floor = tower.floors[floorKey];
                    return (
                        <div key={floorKey}>
                            <h3>Floor {floorKey}</h3>
                            <div style={{textAlign: 'left', width: '40ch', display: 'inline-block'}}>
                                <ul>
                                    {floor.directory.map((company) => {
                                        return (
                                            <li key={company.name}>{company.name}</li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </p>
        </Layout>
    );
}

function ElevatorMap() {
    return (
        <Layout header="Tower Map">
            <p>
                Key: <b>&#123;zone&#125;/&#123;bank&#125;</b><br/>
                Ex. Floor 106 is elevator <b>3/D</b> which is Zone 3, Bank D.<br/>
                <br/>
                <b>Shuttles:</b><br/>
                <div style={{textAlign: 'left', width: '35ch', display: 'inline-block'}}>
                    <ul>
                        <li><b>S/2</b> => Shuttle to Zone 2</li>
                        <li><b>S/3</b> => Shuttle to Zone 3</li>
                        <li><b>S/E</b> => Express Shuttle (tower 2 only)</li>
                        <li><b>S</b> => Stairs</li>
                    </ul>
                </div>
                <br/>
                For accessibility, you can see a html version <a href="/elevator_spreadsheet/elevators.html">here</a>.
                <br/><br/>
                <img src={elevators} alt="Elevator Map" style={{width: '100%', maxWidth: '500px'}}/>
            </p>
        </Layout>
    );
}

export {
    Map, TowerDirectory, ElevatorMap
};
