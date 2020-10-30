import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Input, Icon, Tag, message } from 'antd';

import './index.less';
import MembersSelector from './MembersSelector';
import MembersSelectorRadio from './MembersSelector/SelectorRadio';

class MembersPage extends React.Component {
	static defaultProps = {
		MembersList: [],
	};

	static propTypes = {
		isMultiple: PropTypes.bool,
		isSearch: PropTypes.bool,
		checkedItems: PropTypes.array,
		membersItems: PropTypes.array,
		title: PropTypes.string,
		iconType: PropTypes.string,
	};

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			isMultiple: props.isMultiple,
			isSearch: props.isSearch,
			title: props.title,
			iconType: props.iconType,
			checkedItems: props.checkedItems || [],
			membersItems: props.membersItems || [],
		};
	}

	//打开人员选择器
	onClick = () => {
		const { isMultiple, checkedItems } = this.state;
		if (!isMultiple && checkedItems.length > 1) {
			message.error('您选择了单选，但是已选为多个，请重新选择！', 3);
			return;
		}
		this.setState({
			visible: true,
		});
	};

	onChange = checkedItems => {
		console.log('onChange', checkedItems);
		const { onChange } = this.props;
		this.setState(
			{
				visible: false,
				checkedItems,
			},
			() => {
				onChange && onChange(checkedItems);
			}
		);
	};

	onCancel = () => {
		this.setState({
			visible: false,
		});
	};

	delTag = (item, index) => {
		const { onChange } = this.props;
		console.log('item', item);
		const checkedItems = this.state.checkedItems.filter(
			checkedItem => checkedItem['id'] != item['id']
		);
		this.setState(
			{
				checkedItems,
			},
			() => {
				if (onChange) {
					onChange(checkedItems);
				}
			}
		);
	};

	render() {
		const {
			isMultiple,
			checkedItems,
			title,
			visible,
			membersItems,
			isSearch,
			iconType,
		} = this.state;
		return (
			<div className="members-container">
				<div className="input-box">
					{checkedItems &&
						checkedItems.map((item, index) => {
							return (
								<Tag key={index} closable onClose={() => this.delTag(item, index)}>
									{item.name || item.id}
								</Tag>
							);
						})}
					<Tag
						onClick={e => this.onClick(e)}
						style={{ background: '#fff', borderStyle: 'dashed' }}
					>
						<Icon type="plus" /> {'添加' + title || '添加成员'}
					</Tag>
				</div>
				{/* 多选 */}
				{visible && isMultiple && (
					<MembersSelector
						visible={this.state.visible}
						onOk={this.onChange}
						onCancel={this.onCancel}
						title={title}
						isMultiple={isMultiple}
						isSearch={isSearch}
						checkedItems={checkedItems}
						iconType={iconType}
						membersItems={membersItems}
					/>
				)}
				{/* 单选 */}
				{visible && !isMultiple && (
					<MembersSelectorRadio
						visible={this.state.visible}
						onOk={this.onChange}
						onCancel={this.onCancel}
						title={title}
						isMultiple={isMultiple}
						isSearch={isSearch}
						iconType={iconType}
						checkedItems={checkedItems}
						membersItems={membersItems}
					/>
				)}
			</div>
		);
	}
}

export default MembersPage;
