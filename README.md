# members-selector

由于目前在开发Saas平台时，多次用到一个弹窗选择器，每个项目都需要去重写，代码重复性太大，于是有了自己根据这些需求去开发一个组件的想法。

此选择器是基于react+antd3.x的Modal弹窗选择器，支持多选、单选、搜索等功能。传参有：可选、已选的成员列表，是否支持多选，是否需要搜索框，传入标题、字体图标的type等。

#### 1. 安装
   
npm install members-selector -D

#### 2. 快速开始

```
//引用
import MembersSelector from 'members-selector';

//使用
<MembersSelector
    isMultiple={isMultiple}
    isSearch={isSearch}
    title={title}
    iconType={iconType}
    checkedItems={checkedItems}
    membersItems={membersItems}
/>

注： 
isMultiple：是否多选，bool类型
isSearch：是否需要搜索框，bool类型
title：标题，string类型，例如：人员、银行卡等
iconType：基于antd3.x的字体图标类型，string类型，例如user等
checkedItems：已选的数组，当没有已选的对象时，可以传空数组 [{name:'周杰伦',id:123},{name:'周杰伦1',id:456}]
membersItems：可选的数组，格式同checkedItems

    
```





