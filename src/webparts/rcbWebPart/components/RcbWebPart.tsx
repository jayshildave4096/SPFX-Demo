import * as React from "react";
import styles from "./RcbWebPart.module.scss";
import { IRcbWebPartProps } from "./IRcbWebPartProps";
import { escape } from "@microsoft/sp-lodash-subset";
import "./style.scss";
import { Button, Row, Col } from "antd";
import Grid from "antd/lib/card/Grid";
import { IRcbWebPartState } from "./IRcbWebPartState";
import CheckList from "./Helper";
import { SPHttpClient } from "@microsoft/sp-http";

export default class RcbWebPart extends React.Component<
  IRcbWebPartProps,
  IRcbWebPartState
> {
  constructor(props: IRcbWebPartProps, state: IRcbWebPartState) {
    super(props);
    this.state = {
      status: "",
      isChecked: false,
    };
    this.checkList = this.checkList.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  public renderButton() {
    return (
      <Col className="gutter-row" span={6}>
        <Button type="primary" size="large" danger>
          Create
        </Button>
      </Col>
    );
  }
  public render(): React.ReactElement<IRcbWebPartProps> {
    return (
      <div className={styles.rcbWebPart}>
        <Row className={styles.container}>
          <Col className="gutter-row" span={6}>
            <Button onClick={this.checkList} type="primary" size="large" danger>
              Check
            </Button>
          </Col>
          {this.state.isChecked ? this.renderButton() : null}
        </Row>

        <Row className={styles.log}>
          <Col span={24}>Log:{this.state.status}</Col>
        </Row>
      </div>
    );
  }
  private checkList = () => {
    this.setState({
      status: "CHECKING......",
    });
    CheckList({
      client: this.props.spHttpClient,
      url: this.props.siteUrl,
    }).then((response: string) => {
      this.setState({
        status: response,
      });
      if (response === "LIST NOT FOUND") {
        this.setState({
          isChecked: true,
        });
      }
    });
  };
}
