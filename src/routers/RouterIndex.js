import IncomeIndex from "../pages/income/IncomeIndex";
import IncomeEdit from "../pages/income/IncomeEdit";
import PaymentIndex from "../pages/payment/PaymentIndex";
import PaymentEdit from "../pages/payment/PaymentEdit";
import ReportIndex from "../pages/report/ReportIndex";
import NotFoundPage from "../pages/NotFound";
import AlarmEdit from "../pages/report/AlarmEdit";
import ConfigIndex from "../pages/config/ConfigIndex";
import {
    PayCircleOutlined,
    ExportOutlined,
    BarChartOutlined,
    SettingOutlined
} from '@ant-design/icons';
import ConfigEdit from "../pages/config/ConfigEdit";

export const mainRouters = [
    {
        path: '/404',
        component: NotFoundPage,
        show: false
    }, {
        path: '/report',
        component: ReportIndex,
        show: true,
        title: "统计",
        icon: <BarChartOutlined/>
    }, {
        path: '/alarm/edit/:id?',
        component: AlarmEdit,
        show: false
    }, {
        path: '/income',
        component: IncomeIndex,
        show: true,
        exact: true,
        title: "收入",
        icon: <PayCircleOutlined/>
    }, {
        path: '/income/edit/:id?',
        component: IncomeEdit,
        show: false
    }, {
        path: '/payment',
        component: PaymentIndex,
        show: true,
        exact: true,
        title: "支出",
        icon: <ExportOutlined/>
    }, {
        path: '/payment/edit/:id?',
        component: PaymentEdit,
        show: false
    },{
        path: '/config/edit/:id?',
        component: ConfigEdit,
        show: false
    }, {
        path: '/config',
        component: ConfigIndex,
        show: true,
        exact: true,
        title: "配置",
        icon: <SettingOutlined/>
    },
]