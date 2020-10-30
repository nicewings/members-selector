import React from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { Modal, Input, Icon, Checkbox, message, Spin, Radio } from 'antd';
const Search = Input.Search;

import './index.less';

class MembersSelector extends React.Component {
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
			checkedItems: props.checkedItems[0] || {},
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
			checkedItems: nextProps.checkedItems[0] || {},
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
		this.setState({
			checkedItems: item,
		});
	};

	onOk = () => {
		const { checkedItems, title } = this.state;
		if (!checkedItems || !checkedItems.id) {
			message.error(`请选择${title}`);
			return;
		}
		let arr = [checkedItems];
		this.props.onOk(arr);
	};

	render() {
		const { checkedItems, title, iconType, isSearch, searchItems } = this.state;
		console.log('checkedItems', checkedItems);
		return (
			<Modal
				className="Select-Modal"
				visible={this.props.visible}
				onOk={this.onOk}
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

								<Scrollbars className="scrollbars" style={{ height: '319px' }}>
									<ul>
										{searchItems &&
											searchItems.map(item => {
												return (
													<li className="list-item" key={'w_' + item.id}>
														<Radio
															value={item.id}
															onChange={e =>
																this.handleChange(e, item)
															}
															checked={
																checkedItems &&
																checkedItems.id == item.id
															}
														>
															<Icon
																type={iconType}
																style={{
																	color: '#38adff',
																	fontSize: '14px',
																}}
															/>
															<span className="myspan">
																{item.name}
															</span>
														</Radio>
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
									{checkedItems && (
										<li className="list-item">
											<Radio value={checkedItems.id} checked={true}>
												<Icon
													type={iconType}
													style={{
														color: '#38adff',
														fontSize: '14px',
													}}
												/>
												<span className="myspan">{checkedItems.name}</span>
											</Radio>
										</li>
									)}
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
