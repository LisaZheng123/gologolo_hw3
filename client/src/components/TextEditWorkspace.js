import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                color: this.props.logo.textColor,
                backgroundColor: this.props.logo.backgroundColor,
                fontSize: this.props.logo.fontSize + "pt",
                borderColor: this.props.logo.borderColor,
                borderStyle: "solid",
                padding: this.props.logo.padding + "pt",
                margin: this.props.logo.margin + "px",
                width: "max-content",
                borderRadius: this.props.logo.borderRadius + "px",
                borderWidth: this.props.logo.borderThickness + "px"
            }
        }
        return (
            <div className="col s8">
                <div style={ styles.container }>
                   {this.props.logo.text}
                </div>
            </div>
        )
    }
}

export default TextEditWorkspace