import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal, Input, Icon, Checkbox, message, Spin } from 'antd';
const Search = Input.Search;

import './index.less';

class MembersSelector extends React.Component {
	static defaultProps = {
		checkedItems: [],
	};

	static propTypes = {
		checkedItems: PropTypes.array,
		membersItems: PropTypes.array,
		title: PropTypes.string,
		iconType: PropTypes.string,
		isSearch: PropTypes.bool,
		visible: PropTypes.bool,
		onOk: PropTypes.func,
		onCancel: PropTypes.func,
	};

	constructor(props) {
		super(props);
		this.state = {
			visible: props.visible,
			title: props.title,
			membersItems: props.membersItems, //传过来的所有可选对象
			searchItems: props.membersItems, //搜索过后的可选对象，默认=membersItems
			isSearch: props.isSearch,
			iconType: props.iconType,
			checkedValues: props.checkedItems.map(item => {
				return item.id;
			}),
			checkedItems: props.checkedItems,
			allUserListLoading: true,
		};
	}

	componentDidMount() {
		this.setState({
			allUserListLoading: false,
		});
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			visible: nextProps.visible,
			checkedValues: nextProps.checkedItems
				? nextProps.checkedItems.map(item => {
						return item.id;
				  })
				: [],
			checkedItems: nextProps.checkedItems || [],
			allUserListLoading: true,
		});
	}

	//搜索
	onSearch = value => {
		const { membersItems, searchItems } = this.state;
		let arr = membersItems.filter(item => {
			return item.name.indexOf(value) != -1;
		});
		this.setState({
			searchItems: arr,
		});
	};

	handleChange = (e, item) => {
		e.preventDefault();
		const value = item.id;
		let { membersItems = [], checkedValues, checkedItems } = this.state;
		const index = checkedValues.indexOf(value);
		//删除
		if (index != -1) {
			checkedValues = checkedValues.filter(id => {
				return id != value;
			});
			checkedItems = checkedItems.filter(item => {
				return item.id != value;
			});
			this.setState({
				checkedValues,
				checkedItems,
				checkedAll: membersItems.length == checkedValues.length,
				indeterminate: !!checkedValues.length && checkedValues.length < membersItems.length,
			});
		}
		//添加
		else {
			checkedValues.push(value);
			checkedItems.push(item);
			this.setState({
				checkedValues,
				checkedItems,
				checkedAll: membersItems.length == checkedValues.length,
				indeterminate: !!checkedValues.length && checkedValues.length < membersItems.length,
			});
		}
	};

	checkAll = () => {
		const { membersItems = [], checkedValues = [] } = this.state;
		console.log('membersItems', membersItems);
		let flag = !!checkedValues.length;
		let arr = [];
		membersItems.map(item => {
			return arr.push(item.id);
		});
		if (flag) {
			this.setState({
				checkedValues: [],
				indeterminate: !!checkedValues.length && checkedValues.length < membersItems.length,
				checkedAll: false,
				checkedItems: [],
			});
		} else {
			this.setState({
				checkedValues: arr,
				indeterminate: !!checkedValues.length && checkedValues.length < membersItems.length,
				checkedAll: true,
				checkedItems: membersItems,
			});
		}
	};

	render() {
		const {
			checkedValues,
			checkedItems,
			title,
			iconType,
			isSearch,
			indeterminate = false,
			checkedAll = false,
			searchItems,
		} = this.state;
		console.log('checkedItems', checkedItems);
		return (
			<Modal
				className="Select-Modal"
				visible={this.props.visible}
				onOk={() => this.props.onOk(checkedItems)}
				onCancel={this.props.onCancel}
				width={700}
			>
				<div className="MembersSelector selector-panel-box">
					<div className="selector-panel">
						<div className="title">选择{title}</div>
						<Spin spinning={this.state.allUserListLoading}>
							<div className="body">
								{/* 是否展示搜索框 */}
								{isSearch && (
									<div className="selector-input">
										<Search
											placeholder="名称"
											style={{ width: '100%' }}
											onSearch={this.onSearch.bind(this)}
										/>
									</div>
								)}

								<div className="selector-navbar">
									<Checkbox
										indeterminate={indeterminate}
										checked={checkedAll}
										className="check-all"
										onChange={() => this.checkAll()}
									>
										全选
									</Checkbox>
								</div>
								<Scrollbars className="scrollbars" style={{ height: '250px' }}>
									<ul>
										{searchItems &&
											searchItems.map(item => {
												return (
													<li className="list-item" key={'w_' + item.id}>
														<Checkbox
															value={item.id}
															onChange={e =>
																this.handleChange(e, item)
															}
															checked={
																checkedValues.indexOf(item.id) != -1
															}
														>
															<Icon
																type={iconType}
																style={{
																	color: '#38adff',
																	fontSize: '14px',
																}}
															/>
															<span
																style={{
																	paddingLeft: '5px',
																}}
															>
																{item.name}
															</span>
														</Checkbox>
													</li>
												);
											})}
									</ul>
								</Scrollbars>
							</div>
						</Spin>
					</div>

					<div className="selector-panel">
						<div className="title">已选{title}</div>
						<div className="body">
							<Scrollbars className="scrollbars" style={{ height: '360px' }}>
								<ul>
									{checkedItems &&
										checkedItems.map(item => {
											return (
												<li className="list-item" key={'s_' + item.id}>
													<Checkbox
														value={item.id}
														onChange={e => this.handleChange(e, item)}
														checked={true}
													>
														<Icon
															type={iconType}
															style={{
																color: '#38adff',
																fontSize: '14px',
															}}
														/>
														<span
															style={{
																paddingLeft: '5px',
															}}
														>
															{item.name}
														</span>
													</Checkbox>
												</li>
											);
										})}
								</ul>
							</Scrollbars>
						</div>
					</div>
					<div style={{ clear: 'both' }}></div>
				</div>
			</Modal>
		);
	}
}

export default MembersSelector;
