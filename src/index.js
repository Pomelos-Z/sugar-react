import ReactDOM from 'react-dom';
import './index.css';
import {mainRouters} from "./routers/RouterIndex";
import reportWebVitals from './reportWebVitals';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import DefaultLayout from "./pages/components/Frame/FrameIndex";

ReactDOM.render(
    <Router>
        <DefaultLayout>
            <Switch>
                {mainRouters.map(router => {
                    return <Route key={router.path} {...router}/>;
                })}
                <Redirect to='/report' from="/"/>
                <Redirect to='/404'/>
            </Switch>
        </DefaultLayout>
    </Router>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
