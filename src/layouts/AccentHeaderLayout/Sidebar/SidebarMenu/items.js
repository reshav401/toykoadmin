import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import SupportTwoToneIcon from '@mui/icons-material/SupportTwoTone';
import BackupTableTwoToneIcon from '@mui/icons-material/BackupTableTwoTone';
import SmartToyTwoToneIcon from '@mui/icons-material/SmartToyTwoTone';
import LayersIcon from '@mui/icons-material/Layers';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';

const menuItems = [
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Dashboards',
        icon: DashboardIcon,
        link: '/dashboards',
        items: [
          {
            name: 'Reports',
            link: '/dashboards/reports',
            badge: '',
            badgeTooltip: 'Reports Dashboard - version 3.0'
          },
          {
            name: 'Expenses',
            link: '/dashboards/expenses',
            badge: '',
            badgeTooltip: 'Expenses Dashboard - version 3.0'
          },
          {
            name: 'Products',
            link: '/dashboards/products',
            badge: '',
            badgeTooltip: 'Products Dashboard - version 3.0'
          },
          {
            name: 'Statistics',
            link: '/dashboards/statistics',
            badge: '',
            badgeTooltip: 'Statistics Dashboard - version 3.0'
          },
          {
            name: 'Automation',
            link: '/dashboards/automation'
          },
          {
            name: 'Analytics',
            link: '/dashboards/analytics'
          },
          {
            name: 'Banking',
            link: '/dashboards/banking'
          },
          {
            name: 'Commerce',
            link: '/dashboards/commerce'
          },
          {
            name: 'Crypto',
            link: '/dashboards/crypto'
          },
          {
            name: 'Finance',
            link: '/dashboards/finance'
          },
          {
            name: 'Fitness',
            link: '/dashboards/fitness'
          },
          {
            name: 'Healthcare',
            link: '/dashboards/healthcare',
            items: [
              {
                name: 'Doctors',
                link: '/dashboards/healthcare/doctor'
              },
              {
                name: 'Hospital',
                link: '/dashboards/healthcare/hospital'
              }
            ]
          },
          {
            name: 'Helpdesk',
            link: '/dashboards/helpdesk'
          },
          {
            name: 'Learning',
            link: '/dashboards/learning'
          },
          {
            name: 'Monitoring',
            link: '/dashboards/monitoring'
          },
          {
            name: 'Tasks',
            link: '/dashboards/tasks'
          }
        ]
      },
      {
        name: 'Catalog',
        icon: LayersIcon,
        link: '/catalog',
        items: [
          {
            name: 'Divisions',
            link: '/catalog/divisions',
          },
          {
            name: 'Verticals',
            link: '/catalog/verticals',
          },
          {
            name: 'Brands',
            link: '/catalog/brands',
          },
          {
            name: 'Units',
            link: '/catalog/units',
          },
          {
            name: 'Products',
            link: '/catalog/products',
          }
        ]
      },
      {
        name: 'Customer',
        icon: StorefrontIcon,
        link: '/customer',
        items: [
          {
            name: 'Customers',
            link: '/customer/customers',
          },
          {
            name: 'Customer Types',
            link: '/customer/customer-types',
          },
          {
            name: 'Customer Classes',
            link: '/customer/customer-classes',
          },
        ]
      },

      




  //     {
  //       name: 'Blueprints',
  //       icon: BackupTableTwoToneIcon,
  //       items: [
  //         {
  //           name: 'Extended Sidebar',
  //           link: '/dashboards/reports',
  //           badge: 'v3.0',
  //           badgeTooltip: 'Added in version 3.0'
  //         },
  //         {
  //           name: 'Accent Header',
  //           link: '/blueprints/accent-header/dashboards/reports',
  //           badge: '',
  //           badgeTooltip: 'Updated'
  //         },
  //         {
  //           name: 'Accent Sidebar',
  //           link: '/blueprints/accent-sidebar/dashboards/reports'
  //         },
  //         {
  //           name: 'Boxed Sidebar',
  //           link: '/blueprints/boxed-sidebar/dashboards/reports'
  //         },
  //         {
  //           name: 'Collapsed Sidebar',
  //           link: '/blueprints/collapsed-sidebar/dashboards/reports'
  //         },
  //         {
  //           name: 'Bottom Navigation',
  //           link: '/blueprints/bottom-navigation/dashboards/reports'
  //         },
  //         {
  //           name: 'Top Navigation',
  //           link: '/blueprints/top-navigation/dashboards/reports'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Dashboards',
  //       icon: SmartToyTwoToneIcon,
  //       link: '/blueprints/accent-header/dashboards',
  //       items: [
  //         {
  //           name: 'Reports',
  //           link: '/blueprints/accent-header/dashboards/reports',
  //           badge: '',
  //           badgeTooltip: 'Reports Dashboard - version 3.0'
  //         },
  //         {
  //           name: 'Expenses',
  //           link: '/blueprints/accent-header/dashboards/expenses',
  //           badge: '',
  //           badgeTooltip: 'Expenses Dashboard - version 3.0'
  //         },
  //         {
  //           name: 'Products',
  //           link: '/blueprints/accent-header/dashboards/products',
  //           badge: '',
  //           badgeTooltip: 'Products Dashboard - version 3.0'
  //         },
  //         {
  //           name: 'Statistics',
  //           link: '/blueprints/accent-header/dashboards/statistics',
  //           badge: '',
  //           badgeTooltip: 'Statistics Dashboard - version 3.0'
  //         },
  //         {
  //           name: 'Automation',
  //           link: '/blueprints/accent-header/dashboards/automation'
  //         },
  //         {
  //           name: 'Analytics',
  //           link: '/blueprints/accent-header/dashboards/analytics'
  //         },
  //         {
  //           name: 'Banking',
  //           link: '/blueprints/accent-header/dashboards/banking'
  //         },
  //         {
  //           name: 'Commerce',
  //           link: '/blueprints/accent-header/dashboards/commerce'
  //         },
  //         {
  //           name: 'Crypto',
  //           link: '/blueprints/accent-header/dashboards/crypto'
  //         },
  //         {
  //           name: 'Finance',
  //           link: '/blueprints/accent-header/dashboards/finance'
  //         },
  //         {
  //           name: 'Fitness',
  //           link: '/blueprints/accent-header/dashboards/fitness'
  //         },
  //         {
  //           name: 'Healthcare',
  //           link: '/blueprints/accent-header/dashboards/healthcare',
  //           items: [
  //             {
  //               name: 'Doctors',
  //               link: '/blueprints/accent-header/dashboards/healthcare/doctor'
  //             },
  //             {
  //               name: 'Hospital',
  //               link: '/blueprints/accent-header/dashboards/healthcare/hospital'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'Helpdesk',
  //           link: '/blueprints/accent-header/dashboards/helpdesk'
  //         },
  //         {
  //           name: 'Learning',
  //           link: '/blueprints/accent-header/dashboards/learning'
  //         },
  //         {
  //           name: 'Monitoring',
  //           link: '/blueprints/accent-header/dashboards/monitoring'
  //         },
  //         {
  //           name: 'Tasks',
  //           link: '/blueprints/accent-header/dashboards/tasks'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   heading: 'Extra Pages',
  //   items: [
  //     {
  //       name: 'Auth Pages',
  //       icon: VpnKeyTwoToneIcon,
  //       items: [
  //         {
  //           name: 'Login',
  //           items: [
  //             {
  //               name: 'Basic',
  //               link: '/auth/login/basic?demo=true'
  //             },
  //             {
  //               name: 'Cover',
  //               link: '/auth/login/cover?demo=true'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'Register',
  //           items: [
  //             {
  //               name: 'Basic',
  //               link: '/auth/register/basic?demo=true'
  //             },
  //             {
  //               name: 'Cover',
  //               link: '/auth/register/cover?demo=true'
  //             },
  //             {
  //               name: 'Wizard',
  //               link: '/auth/register/wizard?demo=true'
  //             }
  //           ]
  //         },
  //         {
  //           name: 'Recover Password',
  //           link: '/auth/recover-password?demo=true'
  //         }
  //       ]
  //     },
  //     {
  //       name: 'Status',
  //       icon: ErrorTwoToneIcon,
  //       items: [
  //         {
  //           name: 'Error 404',
  //           link: '/status/404'
  //         },
  //         {
  //           name: 'Error 500',
  //           link: '/status/500'
  //         },
  //         {
  //           name: 'Maintenance',
  //           link: '/status/maintenance'
  //         },
  //         {
  //           name: 'Coming Soon',
  //           link: '/status/coming-soon'
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   heading: 'Foundation',
  //   items: [
  //     {
  //       name: 'Overview',
  //       link: '/',
  //       icon: DesignServicesTwoToneIcon
  //     },
  //     {
  //       name: 'Documentation',
  //       icon: SupportTwoToneIcon,
  //       link: '/docs'
  //     }
    ]
  }
];
export default menuItems;
