import { appConfig } from '../config'
import { connect } from 'react-redux'
import { createBookmark, deleteBookmark, getCurrentBookmark } from '../actions/bookmarks'
import BookmarkAddedIconDesktop from '../static/added-bookmark-desktop.svg'
import BookmarkAddedIconMobile from '../static/added-bookmark-mobile.svg'
import BookmarkUnaddedIconDesktop from '../static/add-bookmark-desktop.svg'
import BookmarkUnaddedIconMobile from '../static/add-bookmark-mobile.svg'
import browserHistory from 'react-router/lib/browserHistory'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

// const DEFAULT_BOOKMARK_HOST = 'https://www.twreporter.org'
const buttonWidth = 52
const buttonHeight = 52


const MobileIconContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: ${buttonWidth}px;
  height: ${buttonHeight}px;
  background-color: rgba(255, 255, 255, .8);
  overflow: hidden;
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  cursor: pointer;
`

const BookmarkImg = styled.div`
  opacity: ${props => (props.showUp ? 1 : 0)};
  transition: opacity 200ms linear;
  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

// Desktop
const DesktopIconContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  ${(props) => {
    if (props.svgColor !== '') {
      return `
        path {
          fill: ${props.svgColor};
        }
      `
    }
    return ''
  }};
`

const BookmarkImgDesktop = styled.div`
  opacity: ${props => (props.showUp ? 1 : 0)};
  transition: opacity 200ms linear;
  position: absolute;
  transform: translateX(-50%);
  left: 50%;
`


class BookmarkPrototype extends React.Component {
  /* TODO server side to prepare the bookmark value
  static fetchData({ params, store }) {
    const slug = params.slug
    const reduxState = store.getState()
    const authenticated = _.get(reduxState, 'auth.authenticated', false)
    if (authenticated) {
      const userID = _.get(reduxState, 'auth.id', '')
      // user userID, slug and host to get the current bookmark
    }
  }
  */

  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: false,
    }
    this.checkIsBookmarked = this._checkIsBookmarked.bind(this)
    this.toCreateBookmark = this._toCreateBookmark.bind(this)
    this.toDeleteBookmark = this._toDeleteBookmark.bind(this)
    this.handleOnClickBookmark = this._handleOnClickBookmark.bind(this)
  }

  componentDidMount() {
    const { slug } = this.props
    this.checkIsBookmarked(slug)
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(this.props, 'slug') !== _.get(nextProps, 'slug')) {
      this.checkIsBookmarked(_.get(nextProps, 'slug'))
    }
  }

  /**
   * Check if the user already bookmarked this article,
   * if do, mark the bookmark icon
   *
   * @param {string} slug slug of article
   * @param {string} host=DEFAULT_BOOKMARK_HOST hostname
   */
  async _checkIsBookmarked(slug) {
    if (slug) {
      const { apiUrl, userPath, bookmarkPath, host } = this.props
      try {
        const id = await this.props.getCurrentBookmark(apiUrl, userPath, bookmarkPath, slug, host)
        if (id) {
          this.setState({
            isBookmarked: true,
          })
        } else {
          throw new Error('bookmark id is not set')
        }
      } catch (error) {
        if (this.state.isBookmarked) {
          this.setState({
            isBookmarked: false,
          })
        }
      }
    }
  }

  /**
   * Delete user/bookmark record in the database, and empty the bookmark icon.
   */
  async _toDeleteBookmark() {
    const { slug, apiUrl, userPath, bookmarkPath, host } = this.props
    try {
      const id = await this.props.getCurrentBookmark(apiUrl, userPath, bookmarkPath, slug, host)
      await this.props.deleteBookmark(apiUrl, userPath, bookmarkPath, id)
      this.setState({
        isBookmarked: false,
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Create user/bookmark record in the database, and mark the bookmark icon.
   * If user is not authenticated, it will lead user to sign in page
   */
  async _toCreateBookmark() {
    const { apiUrl, userPath, bookmarkPath, bookmarkData, host, slug, external } = this.props
    if (!slug) {
      return
    }
    try {
      const bookmarkId = await this.props.createBookmark(
        apiUrl,
        userPath,
        bookmarkPath,
        {
          ...bookmarkData,
          is_external: bookmarkData.style === 'interactive',
          host,
        })

      if (bookmarkId) {
        this.setState({
          isBookmarked: true,
        })
      }
    } catch (error) {
      const type = bookmarkData.style === 'interactive' ? 'i' : 'a'
      const webStatus = _.get(error, 'response.status')
      if (webStatus === 401) {
        if (external) {
          window.open(`${appConfig.host}/signin/?path=${type}/${slug}`)
          return
        }
        browserHistory.push(`/signin/?path=${type}/${slug}`)
      }
    }
  }

  _handleOnClickBookmark() {
    if (this.state.isBookmarked) {
      return this.toDeleteBookmark()
    }
    return this.toCreateBookmark()
  }

  render() {
    const { isBookmarked } = this.state
    const { mobile, svgColor } = this.props
    if (mobile) {
      return (
        <MobileIconContainer onClick={this.handleOnClickBookmark}>
          <BookmarkImg showUp={!isBookmarked}>
            <BookmarkUnaddedIconMobile />
          </BookmarkImg>
          <BookmarkImg showUp={isBookmarked}>
            <BookmarkAddedIconMobile />
          </BookmarkImg>
        </MobileIconContainer>
      )
    }
    return (
      <DesktopIconContainer onClick={this.handleOnClickBookmark} svgColor={svgColor}>
        <BookmarkImgDesktop showUp={!isBookmarked}>
          <BookmarkUnaddedIconDesktop />
        </BookmarkImgDesktop>
        <BookmarkImgDesktop showUp={isBookmarked}>
          <BookmarkAddedIconDesktop />
        </BookmarkImgDesktop>
      </DesktopIconContainer>
    )
  }
}

BookmarkPrototype.defaultProps = {
  external: false,
  mobile: false,
  svgColor: '',
}


BookmarkPrototype.propTypes = {
  slug: PropTypes.string.isRequired,
  createBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  getCurrentBookmark: PropTypes.func.isRequired,
  apiUrl: PropTypes.string.isRequired,
  userPath: PropTypes.string.isRequired,
  bookmarkPath: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  bookmarkData: PropTypes.shape({
    slug: PropTypes.string,
    style: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    thumbnail: PropTypes.string,
    category: PropTypes.string,
    published_date: PropTypes.string,
  }).isRequired,
  external: PropTypes.bool,
  mobile: PropTypes.bool,
  svgColor: PropTypes.string,
}

function mapStateToProps(state) {
  return {
    apiUrl: _.get(state, 'authConfigure.apiUrl', ''),
    userPath: _.get(state, 'authConfigure.user', ''),
    bookmarkPath: _.get(state, 'authConfigure.bookmark', ''),
    host: _.get(state, 'authConfigure.host'),
  }
}

export default connect(mapStateToProps, { createBookmark, deleteBookmark, getCurrentBookmark })(BookmarkPrototype)
