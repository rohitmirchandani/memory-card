import React, { useState } from 'react'
import beer from './resources/beer.png'
import './App.css'
import a from './beers/alexander-keith.png';
import b from './beers/budweiser.png';
import c from './beers/guinness-doublin-porter.png';
import d from './beers/heineken.png';
import e from './beers/honey-brown-lager.png';
import f from './beers/labatt-blue.png';
import g from './beers/molson-canadian.png';
import h from './beers/sapporo.png';
import i from './beers/stella-artois.png';
import goimage from './resources/game-over.gif';


const names=['alexander Keith','budweiser','guinness-doublin-porter','heineken','honey-brown-lager',
'labatt-blue','molson-canadian','sapporo','stella-artois']
const images=[a,b,c,d,e,f,g,h,i];
class Beer{
    constructor(image,name){
        this.name = name;
        this.image = image;
        this.clicked = false;
    }
}
function App(){
    const [beers,setBeers] = useState(()=>{
        const temp =[];
        for(let i in images){
            temp.push(new Beer(images[i],names[i]));
        }
        return temp;
    })
    const [score,setScore] = useState(0);
    const [bestScore,setBestScore]=useState(0);
    const randomize= (beer)=>{
        if(beer.clicked===false){
            const allbeers = document.querySelectorAll('#beers>div')
            allbeers.forEach((ele)=>{
            ele.classList.add('rotate');
            })
            setTimeout(()=>{
                allbeers.forEach((ele)=>{
                    ele.classList.remove('rotate');
                })
            },1000)
            const tbeers = [...beers];  
            const temp = [];
            setTimeout(()=>{  
            },1000)
            while(!tbeers.length==0){
                let rand = Math.floor(Math.random()*tbeers.length);
                if(beer===tbeers[rand]){
                    tbeers[rand].clicked=true;
                }
                temp.push(tbeers[rand])
                tbeers.splice(rand,1)
            }
            setBeers(temp);
            setScore((s)=>{
                return s+1;
            })
        }else{
            const gameOver = document.getElementById('game-over-outer-div')
            gameOver.classList.add('game-over');
            setTimeout(()=>{
                gameOver.classList.remove('game-over')
            },1000)
            if(bestScore<score){
                setBestScore(score);
            }
            setScore(0);
            setBeers((c)=>{
                c.map((i)=>{
                    i.clicked=false;
                    return i;
                })
                return c;
            })
        }
    }
    return (
        <div id='game'>
        <header><p><img src={beer}/>Remem<b>Beer</b></p>
            <div id='scoreboard'>
                <div id='names'>
                    <p id='score-name'>SCORE</p>
                    <p id='best-score-name'>BEST SCORE</p>
                </div>
                <div id='scores'>
                    <p id='score'>{score}</p>
                    <p id='best-score'> {bestScore}</p>
                </div>
            </div>
        </header>
        <div id='game-over-outer-div'>
        <div id='game-over-div'>
            <p>Game Over</p>
            <img src={goimage}/>
        </div>
        </div>
            <div id='beers'>
                {
                beers.map((beer,i)=>{
                    return (
                    <div>
                    <img onClick={()=>{randomize(beer)}} src={beer.image}/> 
                    <p>{beer.name}</p>
                    </div>
                    )
                })}
            </div>
        </div>

    )
}

export default App;
