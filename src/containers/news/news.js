import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getNews, addNews, deleteNews } from 'utils/news'

import ListTitle from 'shared-components/list-title/listTitle'

import './news.css'

class News extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      news: [],
      newNews: '',
      showAddContainerStatus: false,
      daysToLast: '',
      adminPassword: '',
    }
  }

  componentWillMount() {
    this.getNews()
  }

  getNews = () => {
    getNews().then(news => {
      this.setState({
        news,
        newNews: '',
        daysToLast: '',
        adminPassowrd: '',
      })
    })
  }

  addNews = () => {
    if (!this.state.newNews || !this.state.daysToLast || !this.state.adminPassword) {
      return
    }
    addNews(this.state.newNews, this.state.daysToLast, this.state.adminPassword).then(res => {
      if (res.data || res.error) {
        return
      }
      this.getNews()
    })
  }

  deleteNews = (id, index) => {
    // search through and remove in UI for quick UI
    let originalNews = this.state.news
    let copied = this.state.news.slice()
    copied.splice(index, 1)
    this.setState({
      news: copied,
    })
    deleteNews(id).then(res => {
      if (res.error) {
        this.setState({
          news: originalNews,
        })
        return
      }
    })
  }

  showAddContainer = () => {
    this.setState({
      showAddContainerStatus: !this.state.showAddContainerStatus,
    })
  }

  updateState = event => {
    this.setState({
      [event.target.id]: event.target.value,
    })
  }

  /**
   * Key listener to login on 'enter'
   */
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.addNews()
    }
  }

  render() {
    return (
      <div className="news">
        <ListTitle
          showAddContainer={this.showAddContainer}
          showAddContainerStatus={this.state.showAddContainerStatus}
          title="News"
        />
        {this.state.showAddContainerStatus && (
          <div className="news-addContainer">
            <input
              className="news-addContainer-input"
              id="newNews"
              onChange={this.updateState}
              onKeyPress={this.handleKeyPress}
              placeholder="Content"
              value={this.state.newNews}
            />
            <input
              className="news-addContainer-input"
              id="daysToLast"
              onChange={this.updateState}
              placeholder="Days to last"
              onKeyPress={this.handleKeyPress}
              value={this.state.daysToLast}
            />
            <input
              className="news-addContainer-input"
              id="adminPassword"
              placeholder="Admin password"
              onChange={this.updateState}
              onKeyPress={this.handleKeyPress}
              value={this.state.adminPassword}
            />
            <button className="news-addContainer-button" onClick={this.addNews}>
              Submit
            </button>
          </div>
        )}
        <div className="news-listContainer">
          {this.state.news.map((singleNews, index) => (
            <div className="news-listContainer-newsContainer" key={`newsList-${singleNews.id}${singleNews.content}`}>
              <h3 className="news-listContainer-newsContainer-name">{singleNews.content}</h3>
              <h3
                className="news-listContainer-newsContainer-delete"
                onClick={() => {
                  this.deleteNews(singleNews.id, index)
                }}
              >
                x
              </h3>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

News.defaultProps = {
  user: null,
}

News.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

News.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(News)
