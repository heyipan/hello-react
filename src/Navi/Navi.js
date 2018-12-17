import { Layout, Menu, Breadcrumb, Icon,Input,Pagination  } from 'antd';
import React, { Component } from 'react';
import $ from 'jquery'
import 'antd/dist/antd.css';
import logo from '../logo.svg';
import './Navi.css';
import MovieItem from './MovieItem';
import { connect } from 'react-redux';
const { Header, Content, Footer, Sider } = Layout;
const Search = Input.Search;
class SiderDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            load:false,
            collapsed: false,
            pageSize: 5,//每页的数量
            page: 1, //当前页
            mode: 'inline',
            data:[],
            title:'',
            total:0,

        }
    }
    componentWillMount(){
        let {pageSize, page} = this.state;
        let start   = (page - 1) * pageSize;//开始

        $.ajax({
            url:'https://api.douban.com/v2/movie/in_theaters?start='+start+'&count='+pageSize,
            type:'get',
            dataType:'jsonp',
            async: false,
            success:function (data) {
                console.log(data)
                this.props.initData(data);
                this.setState({
                    load:true,
                    data:this.props.state.data.subjects,
                    total:this.props.state.data.total,

                })
            }.bind(this)
        });

    }
    /*componentDidMount(){
        $.ajax({
            url:"https://api.douban.com/v2/movie/coming_soon",
            type:'get',
            dataType:'jsonp',
            success:function (data) {
                this.initData(data);
            }.bind(this)
        });
        /!*fetch('https://www.apiopen.top/satinApi?type=1&page=1',{
            method:"get",
            mode:"cors"
        }).then((response) => {
            /!*console.log(response);*!/
           return response.json()
        }).then((data) => {
            console.log(data);
        }).catch(err => console.log("Oh, error", err));*!/
    }
    initData(data){
        this.setState({
            load:true,
            data:data.subjects
        })
    }*/
    getUrlAddress = (e) => {
        let href = e.domEvent.target.dataset.url;
        this.setState({
            load:false
        })
        $.ajax({
            url:"https://api.douban.com/v2/movie/"+href,
            type:'get',
            dataType:'jsonp',
            async: false,
            success:function (data) {
                this.props.initData(data);
                this.setState({
                    load:true,
                    data:this.props.state.data.subjects,
                    total:this.props.state.data.total
                })
            }.bind(this)
        });

    }
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            title:""
        });
    }
    pageUpdata = (page,pageSize) => {
        this.setState({
            load:false,
        })
        let start   = (page -1) * pageSize;//开始

        $.ajax({
            url:'https://api.douban.com/v2/movie/in_theaters?start='+start+'&count='+pageSize,
            type:'get',
            dataType:'jsonp',
            async: false,
            success:function (data) {
                this.props.initData(data);
                this.setState({
                    load:true,
                    data:this.props.state.data.subjects,
                    page: page++
                })
            }.bind(this)
        });
    }
    render() {
        let html =null;
        if(this.state.load) {
            html = this.state.data.map(function (movie,index) {
                    return (<MovieItem movie={movie} key={index}/>)
                })
        }else {
            html =(
                <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div>
                )
        }
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <div className="logo" >
                        <img src={logo} alt="logo"  className="App-logo"/>
                    </div>
                    <Menu theme="dark" mode="inline" onClick={this.getUrlAddress}>
                        <Menu.Item key="1">
                            <Icon type="video-camera" />
                            <span className="nav-text" data-url="/in_theaters"> 正在上映</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="play-circle" />
                            <span className="nav-text" data-url="/coming_soon">即将上映</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="rise" />
                            <span className="nav-text" data-url="/top250">TOP250</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background:'#000'}}>
                        <span style={{color:'#fff',paddingLeft:'2%', fontSize:'1.4em'}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                                style={{cursor: 'pointer'}}
                            />
                        </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>即将上映</span>
                        <span className="originalSearch">
                            <Search
                                placeholder="input search movie"
                                onSearch={value => console.log(value)}
                                style={{ width: 350 }}
                            />
                        </span>
                    </Header>
                    <Content style={{ margin: '0 16px' }} >
                        <Breadcrumb style={{ margin: '12px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{padding: 24, background: '#fff', minHeight: '760px' }}>
                            {
                                html
                            }
                        </div>
{/*
                        {this.state.total ?  <Pagination  style={{textAlign:"center"}}   current={this.state.page} pageSize={this.state.pageSize}  total={this.state.total} onChange={this.pageUpdata}/> : null }
*/}
                    <Pagination  style={{textAlign:"center"}}   current={this.state.page} pageSize={this.state.pageSize}  total={this.state.total} onChange={this.pageUpdata}/>}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        /*这个的值（key） 就是this.props里面的的名称*/
        state: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        initData: (data) => {
            dispatch({type:'INIT_MOVIE',movie_list:data})
        },
    }
}
SiderDemo = connect(mapStateToProps,mapDispatchToProps)(SiderDemo);
export default SiderDemo;
