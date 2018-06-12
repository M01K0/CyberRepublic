import React from 'react';
import BaseComponent from '@/model/BaseComponent'
import moment from 'moment'

import { Col, Row, Button, Divider, message, List, Icon, Tooltip, Popconfirm } from 'antd'

import {TASK_CATEGORY, TASK_TYPE, TASK_STATUS, TASK_CANDIDATE_STATUS, USER_ROLE} from '@/constant'

import './style.scss'

import config from '@/config'

const dateTimeFormat = 'MMM D, YYYY - h:mma (Z [GMT])'

export default class extends BaseComponent {

    ord_render () {

        if (!this.props.member) {
            return <div/>
        }

        let roleName = this.props.member.role
        if (roleName === USER_ROLE.LEADER) {
            roleName = 'ORGANIZER'
        }

        return (
            <div className="c_Member public">
                <h3>
                    {this.props.member.username} - &nbsp;
                    {_.capitalize(roleName)}
                </h3>
                <Row>
                    <Col span={12} className="gridCol">
                        <Row>
                            <Col span={24} className="section-title">
                                <h4>Info</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="label-col">
                                First Name
                            </Col>
                            <Col span={16}>
                                <p>
                                    {this.props.member.profile.firstName}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="label-col">
                                Last Name
                            </Col>
                            <Col span={16}>
                                <p>
                                    {this.props.member.profile.lastName}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} className="section-title">
                                <h4>Location</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="label-col">
                                Country
                            </Col>
                            <Col span={16}>
                                <p>
                                    {this.getCountryName(this.props.member.profile.country)}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="label-col">
                                State/Province
                            </Col>
                            <Col span={16}>
                                <p>
                                    {this.props.member.profile.state ? this.props.member.profile.state : 'not entered'}
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8} className="label-col">
                                City
                            </Col>
                            <Col span={16}>
                                <p>
                                    {this.props.member.profile.city ? this.props.member.profile.city : 'not entered'}
                                </p>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12} className="gridCol left-vert-sep">
                        <Row>
                            <Col span={24} className="section-title">
                                <h4>Send an Email</h4>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>

                            </Col>
                        </Row>
                    </Col>
                </Row>

            </div>
        )
    }

    getCountryName(countryCode) {
        return config.data.mappingCountryCodeToName[countryCode]
    }

}