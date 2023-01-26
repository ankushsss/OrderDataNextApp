const navigation = () => [
  {
    title: 'Home',
    path: '/home',
    icon: 'bx:home-circle',
  },
  {
    title: 'Orders',
    path: '/tables/data-grid/',
    icon: 'bx:envelope',
  },
  {
    path: '/acl',
    action: 'read',
    subject: 'acl-page',
    title: 'Access Control',
    icon: 'bx:shield',
  }
]

export default navigation
