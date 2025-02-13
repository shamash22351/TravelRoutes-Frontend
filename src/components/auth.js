import React, { Component } from "react";
import "./styleNew.css";


export default class authorization extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            // сам хер где ну таблица крч
        };
    }
    componentDidMount(){
        fetch("")
        .then(res => res.json())
        .then(
            (result) =>{
                this.setState{
                    isLoaded:true
                    // Изменения
                }
            }
            (error) => {
                this.setState({
                    isLoaded:true,
                    error
                })
            }
        )
    }
    render(){
        const{error, isLoaded} = this.state;
        if (error) {
            return <p>Error (error.message)</p>
        }else if (!isLoading) {
            return <p>Loading...</p>
        }
        // else{
        //     вернуть части списка йоу
        // }
    }
}