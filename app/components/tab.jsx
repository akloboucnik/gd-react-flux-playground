import Router from 'react-router';
let {Link} = Router;

// taken from https://github.com/rackt/react-router/blob/master/docs/api/RouterContext.md#examples-2
export default React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  // has to be here or query won't be in this.props
  // TODO: investigate why^
  propTypes: {
      query: React.PropTypes.object
  },

  render: function () {
    var { router } = this.context;
    var isActive = router.isActive(this.props.to, this.props.params, this.props.query);
    var className = isActive ? 'active' : '';
    var link = (
      <Link {...this.props} />
    );
    return <li className={className}>{link}</li>;
  }

});

