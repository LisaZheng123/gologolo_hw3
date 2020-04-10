import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Link } from 'react-router-dom';
import TextEditWorkspace from './TextEditWorkspace';

const ADD_LOGO = gql`
    mutation AddLogo(
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $borderRadius: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $padding: Int!,
        $margin: Int!
    ) 
    {
        addLogo(
            text: $text,
            color: $color,
            fontSize: $fontSize,
            borderRadius: $borderRadius
            backgroundColor: $backgroundColor,
            borderColor: $borderColor,
            padding: $padding,
            margin: $margin
        ) 
        {
            _id
        }
    }
`;

// const GET_LOGO = gql`
//     query logo($logoId: String) {
//         logo(id: $logoId) {
//             _id
//             text
//             color
//             fontSize
//             borderRadius
//             backgroundColor
//             borderColor
//             padding
//             margin
//         }
//     }
// `;

class CreateLogoScreen extends Component {

    render() {
        let text, color, fontSize, borderRadius, backgroundColor, borderColor, padding, margin;
        return (
            // <div className="row">
                // <div className="container col">
                    <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                        {(addLogo, { loading, error }) => (
                            <div className="container">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <h4><Link to="/">Home</Link></h4>
                                        <h3 className="panel-title">
                                            Create Logo
                                    </h3>
                                    </div>
                                    <div className="panel-body">
                                        <form onSubmit={e => {
                                            e.preventDefault();
                                            addLogo({ variables: { text: text.value, color: color.value, fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                            text.value = "";
                                            color.value = "";
                                            fontSize.value = "";
                                            borderRadius.value = "";
                                            backgroundColor = "";
                                            borderColor = "";
                                            padding = "";
                                            margin = "";
                                        }}>
                                            <div className="form-group">
                                                <label htmlFor="text">Text:</label>
                                                <input type="text" className="form-control" name="text" ref={node => {
                                                    text = node;
                                                }} placeholder="Text" defaultValue={"New Gologolo Logo"}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" defaultValue={"#336699"}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" className="form-control" name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} placeholder="Font Size" defaultValue={15}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} placeholder="Border Radius" defaultValue={12}/>
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="backgroundColor">Background Color:</label>
                                                <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                    backgroundColor = node;
                                                }} placeholder="Background Color" defaultValue={"#ffffff"} />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="borderColor">Border Color:</label>
                                                <input type="color" className="form-control" name="borderColor" ref={node => {
                                                    borderColor = node;
                                                }} placeholder="Border Color" defaultValue={"#ffffff"} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <input type="number" className="form-control" name="padding" ref={node => {
                                                    padding = node;
                                                }} placeholder="Padding" defaultValue={15} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <input type="number" className="form-control" name="margin" ref={node => {
                                                    margin = node;
                                                }} placeholder="Margin" defaultValue={15} />
                                            </div>
                                            <button type="submit" className="btn btn-success">Submit</button>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                </div>
                            </div>
                        )}
                    </Mutation>
                
        );
    }
}

export default CreateLogoScreen;