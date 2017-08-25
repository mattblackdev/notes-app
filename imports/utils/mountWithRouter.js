import PropTypes from 'prop-types'
import { mount } from 'enzyme' // handles react components

const context = {
  router: {
    history: {
      push: () => {},
      replace: () => {},
      createHref: () => {}
    }
  }
}

const routerContextConfig = {
  context,
  childContextTypes: {router: PropTypes.object}
}

export default Component => mount(Component, routerContextConfig)