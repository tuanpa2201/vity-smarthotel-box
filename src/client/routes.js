import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

// import Breadcrumbs from './views/Base/Breadcrumbs';


// import Cards from './views/Base/Cards';

// import Carousels from './views/Base/Carousels';

// import Collapses from './views/Base/Collapses';

// import Dropdowns from './views/Base/Dropdowns';

// import Forms from './views/Base/Forms';

// import Jumbotrons from './views/Base/Jumbotrons';

// import ListGroups from './views/Base/ListGroups';

// import Navbars from './views/Base/Navbars';

// import Navs from './views/Base/Navs';

// import Paginations from './views/Base/Paginations';

// import Popovers from './views/Base/Popovers';

// import ProgressBar from './views/Base/ProgressBar';

// import Switches from './views/Base/Switches';

// import Tables from './views/Base/Tables';

// import Tabs from './views/Base/Tabs';

// import Tooltips from './views/Base/Tooltips';

// import BrandButtons from './views/Buttons/BrandButtons';

// import ButtonDropdowns from './views/Buttons/ButtonDropdowns';

// import ButtonGroups from './views/Buttons/ButtonGroups';

// import Buttons from './views/Buttons/Buttons';

// import Charts from './views/Charts';

// import Dashboard from './views/Dashboard';

// import CoreUIIcons from './views/Icons/CoreUIIcons';

// import Flags from './views/Icons/Flags';

// import FontAwesome from './views/Icons/FontAwesome';

// import SimpleLineIcons from './views/Icons/SimpleLineIcons';

// import Alerts from './views/Notifications/Alerts';

// import Badges from './views/Notifications/Badges';

// import Modals from './views/Notifications/Modals';

// import Colors from './views/Theme/Colors';

// import Typography from './views/Theme/Typography';

// import Widgets from './views/Widgets/Widgets';

// import Users from './views/Users/Users';

// import User from './views/Users/User';

import Dashboard from './vity/Dashboard';
import Setting from './vity/Setting';
import ChangePassword from './vity/ChangePassword';



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/setting', name: 'Setting', component: Setting },
  { path: '/ChangePassword', name: 'Change Password', component: ChangePassword },
  // { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  // { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  // { path: '/theme', exact: true, name: 'Theme', component: Colors },
  // { path: '/theme/colors', name: 'Colors', component: Colors },
  // { path: '/theme/typography', name: 'Typography', component: Typography },
  // { path: '/base', exact: true, name: 'Base', component: Cards },
  // { path: '/base/cards', name: 'Cards', component: Cards },
  // { path: '/base/forms', name: 'Forms', component: Forms },
  // { path: '/base/switches', name: 'Switches', component: Switches },
  // { path: '/base/tables', name: 'Tables', component: Tables },
  // { path: '/base/tabs', name: 'Tabs', component: Tabs },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  // { path: '/base/carousels', name: 'Carousel', component: Carousels },
  // { path: '/base/collapses', name: 'Collapse', component: Collapses },
  // { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  // { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  // { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  // { path: '/base/navbars', name: 'Navbars', component: Navbars },
  // { path: '/base/navs', name: 'Navs', component: Navs },
  // { path: '/base/paginations', name: 'Paginations', component: Paginations },
  // { path: '/base/popovers', name: 'Popovers', component: Popovers },
  // { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  // { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  // { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  // { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  // { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', component: Flags },
  // { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  // { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  // { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  // { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  // { path: '/notifications/badges', name: 'Badges', component: Badges },
  // { path: '/notifications/modals', name: 'Modals', component: Modals },
  // { path: '/widgets', name: 'Widgets', component: Widgets },
  // { path: '/charts', name: 'Charts', component: Charts },
  // { path: '/users', exact: true,  name: 'Users', component: Users },
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
