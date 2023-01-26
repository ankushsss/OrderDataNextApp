const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'bx:home-circle',
    },
    {
      title: 'Orders',
      path: '/tables/data-grid/',
      icon: 'bx:grid',
    },
    {
      path: '/acl',
      action: 'read',
      subject: 'acl-page',
      title: 'Access Control',
      icon: 'bx:shield',
    }
  ]
}

export default navigation
