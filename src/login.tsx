import React from "react";
import "./App.css";
import Button2 from "@mui/material/Button";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Userfront from "@userfront/core";
import * as nearAPI from "near-api-js";
Userfront.init("demo1234");


class Login extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      emailOrUsername: "",
      password: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Userfront.login({
      method: "password",
      emailOrUsername: this.state.emailOrUsername,
      password: this.state.password,
    });
  }
  handleBack = () => {
    console.log("back");
  };

  handleLogin = async () => {
    console.log("clicked!")

    const { connect, keyStores, WalletConnection } = nearAPI;

    const config: nearAPI.ConnectConfig = {
      networkId: "testnet",
      keyStore: new keyStores.BrowserLocalStorageKeyStore(),
      nodeUrl: "https://rpc.testnet.near.org",
      walletUrl: "https://wallet.testnet.near.org",
      helperUrl: "https://helper.testnet.near.org",
      headers:{},
    };

// connect to NEAR
    const near = await connect(config);

// create wallet connection
    const wallet = new WalletConnection(near, null);
    console.log(wallet)

    console.log("connected?")
  }
  
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Email or username
            <input
              name="emailOrUsername"
              type="text"
              value={this.state.emailOrUsername}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange}
            />
          </label>
          <Button2 onClick={this.handleLogin}>Log in</Button2>
        </form>
        <Link to="/">
          <Button2 onClick={this.handleBack} variant="contained">
            Back
          </Button2>
        </Link>
      </div>
    );
  }
}

export default Login;
