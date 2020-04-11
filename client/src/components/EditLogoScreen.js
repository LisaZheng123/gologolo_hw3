import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import TextEditWorkspace from './TextEditWorkspace';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            borderRadius
            backgroundColor
            borderColor
            padding
            margin
            borderThickness
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id: String!,
        $text: String!,
        $color: String!,
        $fontSize: Int!,
        $borderRadius: Int!,
        $backgroundColor: String!,
        $borderColor: String!,
        $padding: Int!,
        $margin: Int!,
        $borderThickness: Int!
        ) 
        {
            updateLogo(
                id: $id,
                text: $text,
                color: $color,
                fontSize: $fontSize,
                borderRadius: $borderRadius,
                backgroundColor: $backgroundColor,
                borderColor: $borderColor,
                padding: $padding,
                margin: $margin,
                borderThickness: $borderThickness
            )   
                {
                    lastUpdate
                }
        }
`;

class EditLogoScreen extends Component {

    constructor() {
        super();
        this.state = {
            flag: true,     // does the init_value have to be loaded?
            text: "New Gologolo Logo",
            color: "#336699"
        };
    }

    render() {

        let text, color, fontSize, borderRadius, backgroundColor, borderColor, padding, margin, borderThickness;
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    if (this.state.flag){
                        this.setState({...data.logo, flag: false})   // initializes states
                    }
                    return (
                        <div className = "row">
                            <div className = "container col">
                                <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                                    {(updateLogo, { loading, error }) => (
                                        <div className="container">
                                            <div className="panel panel-default">
                                                <div className="panel-heading">
                                                    <h4><Link to="/">Home</Link></h4>
                                                    <h3 className="panel-title">
                                                        Edit Logo
                                                </h3>
                                                </div>
                                                <div className="panel-body">                                            
                                                    <form onSubmit={e => {
                                                        e.preventDefault();
                                                        updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value), borderRadius: parseInt(borderRadius.value), backgroundColor: backgroundColor.value, borderColor: borderColor.value, padding: parseInt(padding.value), margin: parseInt(margin.value), borderThickness: parseInt(borderThickness.value) } });
                                                        text.value = "";
                                                        color.value = "";
                                                        fontSize.value = "";
                                                        borderRadius.value = "";
                                                        backgroundColor = "";
                                                        borderColor = "";
                                                        padding = "";
                                                        margin = "";
                                                        borderThickness = "";
                                                    }}>
                                                        <div className="form-group">
                                                            <label htmlFor="text">Text:</label>
                                                            <input type="text" className="form-control" name="text" ref={node => {
                                                                text = node;
                                                            }} placeholder="Text" defaultValue={data.logo.text} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <input type="color" className="form-control" name="color" ref={node => {
                                                                color = node;
                                                            }} placeholder="Color" defaultValue={data.logo.color} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="fontSize">Font Size:</label>
                                                            <input type="number" className="form-control" name="fontSize" ref={node => {
                                                                fontSize = node;
                                                            }} placeholder="Font Size" defaultValue={data.logo.fontSize} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderRadius">Border Radius:</label>
                                                            <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                                borderRadius = node;
                                                            }} placeholder="Border Radius" defaultValue={data.logo.borderRadius} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="backgroundColor">Background Color:</label>
                                                            <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                                backgroundColor = node;
                                                            }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderColor">Border Color:</label>
                                                            <input type="color" className="form-control" name="borderColor" ref={node => {
                                                                borderColor = node;
                                                            }} placeholder="Border Color" defaultValue={data.logo.borderColor} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="borderThickness">Border Thickness:</label>
                                                            <input type="number" className="form-control" name="borderThickness" ref={node => {
                                                                borderThickness = node;
                                                            }} placeholder="Border Thickness" defaultValue={data.logo.borderThickness} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="padding">Padding:</label>
                                                            <input type="number" className="form-control" name="padding" ref={node => {
                                                                padding = node;
                                                            }} placeholder="Padding" defaultValue={data.logo.padding} />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="margin">Margin:</label>
                                                            <input type="number" className="form-control" name="margin" ref={node => {
                                                                margin = node;
                                                            }} placeholder="Margin" defaultValue={data.logo.margin} />
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
                            </div>
                            <div className = "container col">
                                <TextEditWorkspace logo={data.logo}/>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;