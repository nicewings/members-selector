import React from 'react';
import { render } from 'react-dom';
import { Form, Row, Col, message, Button, Select, Input, DatePicker, Icon } from 'antd';

import MembersInput from '../../src/index.jsx';

import './app.less';
const FormItem = Form.Item;
const { OptGroup, Option } = Select;

class TestPage extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit = e => {
		e.preventDefault();
		console.log('提交');
	};

	handleReset = () => {
		this.props.form.resetFields();
	};

	render() {
		const {
			form: { getFieldDecorator },
		} = this.props;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};

		const title = '人员';
		const isMultiple = true; //是否多选
		const isSearch = true; //是否需要搜索框
		const iconType = 'user'; //成员前展示的icon type, （基于antd 3.x的字体图标）

		//已选择的成员
		const checkedItems = [
			{
				id: 1,
				name: '张学友',
			},
			// {
			// 	id: 2,
			// 	name: '周杰伦',
			// },
			// {
			// 	id: 8,
			// 	name: '张龙焱',
			// },
		];

		//所有可选的成员
		const membersItems = [
			{
				id: 1,
				name: '张学友',
			},
			{
				id: 2,
				name: '周杰伦',
			},
			{
				id: 3,
				name: '彭于晏',
			},
			{
				id: 4,
				name: '吴彦祖',
			},
			{
				id: 5,
				name: '王力宏',
			},
			{
				id: 6,
				name: '金城武',
			},
			{
				id: 7,
				name: '胡歌',
			},
			{
				id: 8,
				name: '张龙焱',
			},
			{
				id: 9,
				name: '朱一龙',
			},
			{
				id: 10,
				name: '王凯',
			},
			{
				id: 11,
				name: '易烊千玺',
			},
			{
				id: 12,
				name: '吴磊',
			},
		];

		return (
			<div className="my-form">
				<Form onSubmit={this.onSubmit.bind(this)} {...formItemLayout}>
					<div className="c_modal_body">
						<FormItem label="添加企业" hasFeedback>
							{getFieldDecorator('corpids', {
								rules: [
									{
										required: true,
										message: '请选择企业',
									},
								],
							})(
								<MembersInput
									isMultiple={isMultiple}
									isSearch={isSearch}
									title={title}
									iconType={iconType}
									checkedItems={checkedItems}
									membersItems={membersItems}
								/>
							)}
						</FormItem>
					</div>
					<div className="c_modal_foot">
						<Button type="primary" htmlType="submit">
							保存
						</Button>
						<Button style={{ marginLeft: '10px' }} onClick={this.handleReset}>
							取消
						</Button>
					</div>
				</Form>
			</div>
		);
	}
}

const ChangeServiceForm = Form.create()(TestPage);
render(<ChangeServiceForm />, document.getElementById('root'));
