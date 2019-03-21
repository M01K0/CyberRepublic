import React from 'react'
import BaseComponent from '@/model/BaseComponent'
import _ from 'lodash'
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Icon,
} from 'antd'
import I18N from '@/I18N'
import ReactQuill from 'react-quill'
import { TOOLBAR_OPTIONS } from '@/config/constant'
import Translation from '@/module/common/Translation/Container'
import sanitizeHtml from 'sanitize-html'
import './style.scss'

const FormItem = Form.Item

// TOTO: add mention module
// https://github.com/afconsult/quill-mention

class C extends BaseComponent {
  constructor(props) {
    super(props)

    this.state = {
      showRules: false,
    }
  }
  //   componentDidMount() {
  //     // TOTO: get council members used for mentions
  //   }

  handleSubmit(e) {
    e.preventDefault()

    const { form, onFormSubmit, data } = this.props

    form.validateFields(async (err, values) => {
      if (!err) {
        if (_.isEmpty(values.description)) {
          form.setFields({
            description: {
              errors: [new Error(I18N.get('suggestion.create.error.descriptionRequired'))],
            },
          })

          return
        }
        if (_.isEmpty(values.description)) {
          form.setFields({
            title: {
              errors: [new Error(I18N.get('suggestion.create.error.titleRequired'))],
            },
          })

          return
        }

        const param = {
          title: values.title,
          desc: sanitizeHtml(values.description, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['u', 's']),
          }),
          link: values.link,
        }

        if (_.get(data, '_id')) {
          param.id = _.get(data, '_id')
        }
        onFormSubmit(param)
      }
    })
  }

  getInputProps() {
    const { getFieldDecorator } = this.props.form
    const { data } = this.props

    const input_el = (
      <Input size="large" placeholder="Title" />
    )

    const textarea_el = (
      <ReactQuill
        placeholder="Description"
        modules={{
          toolbar: TOOLBAR_OPTIONS,
          autoLinks: true,
        }}
      />
    )

    const link_el = (
      <Input size="large" placeholder="Info Link" />
    )

    const title_fn = getFieldDecorator('title', {
      rules: [
        { required: true, message: I18N.get('suggestion.create.error.titleRequired') },
        { min: 4, message: I18N.get('suggestion.create.error.titleTooShort') },
      ],
      initialValue: _.get(data, 'title', ''),
    })
    const descInitValue = `
      <p><strong>${I18N.get('suggestion.form.fields.1')}</strong></p>
      <p><strong>${I18N.get('suggestion.form.fields.2')}</strong></p>
      <p><strong>${I18N.get('suggestion.form.fields.3')}</strong></p>
      <p><strong>${I18N.get('suggestion.form.fields.4')}</strong></p>
      <p><strong>${I18N.get('suggestion.form.fields.5')}</strong></p>
    `

    const description_fn = getFieldDecorator('description', {
      rules: [
        { required: true, message: I18N.get('suggestion.create.error.descriptionRequired') },
        { min: 20, message: I18N.get('suggestion.create.error.descriptionTooShort') },
      ],
      initialValue: _.get(data, 'desc', descInitValue),
    })

    const link_fn = getFieldDecorator('link', {
      rules: [
        { type: 'url' },
      ],
      initialValue: _.get(data, 'link', ''),
    })

    return {
      title: title_fn(input_el),
      description: description_fn(textarea_el),
      link: link_fn(link_el),
    }
  }

  renderTranslationBtn() {
    const { title, description } = this.props.form.getFieldsValue(['title', 'description'])
    const text = `<h1>${title}</h1>${description}`

    return (
      <div>
        <Translation text={text} />
      </div>
    )
  }

  renderHeader() {
    return (
      <Row>
        <Col span={18}>
          <h2 className="title komu-a">
            {this.props.header || I18N.get('suggestion.add').toUpperCase()}
          </h2>
        </Col>
        <Col span={6}>
          <h5 className="alignRight">
            <a onClick={() => {this.setState({showRules: !this.state.showRules})}}>
              {I18N.get('suggestion.rules.rulesAndGuidelines')} <Icon type="question-circle"/>
            </a>
          </h5>
        </Col>
      </Row>
    )
  }

  renderRules() {
    return (
      <div>
        <h4>
          {I18N.get('suggestion.rules.guarantee')}
        </h4>

        <p>
          {I18N.get('suggestion.rules.response')}
        </p>

        <h4>
          {I18N.get('suggestion.rules.guidelines')}
        </h4>

        <ol>
          <li>{I18N.get('suggestion.rules.guidelines.1')}</li>
          <li>{I18N.get('suggestion.rules.guidelines.2')}</li>
          <li>{I18N.get('suggestion.rules.guidelines.3')}</li>
        </ol>

        <h4>
          {I18N.get('suggestion.rules')}
        </h4>

        <ol>
          <li>{I18N.get('suggestion.rules.1')}</li>
          <li>{I18N.get('suggestion.rules.2')}</li>
          <li>{I18N.get('suggestion.rules.3')}</li>
        </ol>

        <p>
          {I18N.get('suggestion.rules.infoRequest')}
        </p>

        <Button class="pull-right" onClick={() => {this.setState({showRules: false})}}>{I18N.get('suggestion.back')}</Button>
        <div class="clearfix">
          <br/>
        </div>
      </div>
    )
  }

  ord_render() {
    const headerNode = this.renderHeader()
    const rulesNode = this.renderRules()
    const p = this.getInputProps()
    const translationBtn = this.renderTranslationBtn()

    const formContent = (
      <div>
        <FormItem className="form-title">
          {p.title}
        </FormItem>
        <FormItem className="form-desc">
          {p.description}
        </FormItem>
        <FormItem className="form-link">
          {p.link}
        </FormItem>
        <FormItem className="form-link">
          {translationBtn}
        </FormItem>
        <Row type="flex" justify="center">
          <Col xs={24} sm={12} md={6}>
            <Button type="ebp" className="cr-btn cr-btn-default" onClick={this.props.onFormCancel}>
              {I18N.get('suggestion.cancel')}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button loading={this.props.loading} type="ebp" htmlType="submit" className="cr-btn cr-btn-primary">
              {I18N.get('suggestion.submit')}
            </Button>
          </Col>
        </Row>
      </div>
    )

    return (
      <div className="c_SuggestionForm">
        {headerNode}
        {this.state.showRules ?
          rulesNode :
          <Form onSubmit={this.handleSubmit.bind(this)} className="d_SuggestionForm">
            {formContent}
          </Form>
        }
      </div>
    )
  }
}

export default Form.create()(C)
