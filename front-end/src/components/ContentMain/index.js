import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'
import CoursePageDemo from "../../routes/Course/coursepage"
import NotificationPage from "../../routes/Notification/notificationpage"
import ChooseCourse from "../../routes/Manage";

const Home = LoadableComponent(()=>import('../../routes/Home/index'))  //参数一定要是函数，否则不会懒加载，只会代码拆分

//基本组件Demo
const ButtonDemo = LoadableComponent(()=>import('../../routes/General/ButtonDemo/index'))
const IconDemo = LoadableComponent(()=>import('../../routes/General/IconDemo/index'))

//导航组件Demo
const DropdownDemo = LoadableComponent(()=>import('../../routes/Navigation/DropdownDemo/index'))
const MenuDemo = LoadableComponent(()=>import('../../routes/Navigation/MenuDemo/index'))
const StepsDemo = LoadableComponent(()=>import('../../routes/Navigation/StepsDemo/index'))

//输入组件Demo
const FormDemo1 = LoadableComponent(()=>import('../../routes/Entry/FormDemo/FormDemo1'))
const FormDemo2 = LoadableComponent(()=>import('../../routes/Entry/FormDemo/FormDemo2'))
const UploadDemo = LoadableComponent(()=>import('../../routes/Entry/UploadDemo/index'))

//显示组件Demo
const CarouselDemo = LoadableComponent(()=>import('../../routes/Display/CarouselDemo/index'))
const CollapseDemo = LoadableComponent(()=>import('../../routes/Display/CollapseDemo/index'))
const ListDemo = LoadableComponent(()=>import('../../routes/Display/ListDemo/index'))
const TableDemo = LoadableComponent(()=>import('../../routes/Display/TableDemo/index'))
const TabsDemo = LoadableComponent(()=>import('../../routes/Display/TabsDemo/index'))


//反馈组件Demo
const SpinDemo = LoadableComponent(()=>import('../../routes/Feedback/SpinDemo/index'))
const ModalDemo = LoadableComponent(()=>import('../../routes/Feedback/ModalDemo/index'))
const NotificationDemo = LoadableComponent(()=>import('../../routes/Feedback/NotificationDemo/index'))

//其它
const AnimationDemo = LoadableComponent(()=>import('../../routes/Other/AnimationDemo/index'))
const GalleryDemo = LoadableComponent(()=>import('../../routes/Other/GalleryDemo/index'))
const DraftDemo = LoadableComponent(()=>import('../../routes/Other/DraftDemo/index'))
const ChartDemo = LoadableComponent(()=>import('../../routes/Other/ChartDemo/index'))
const LoadingDemo = LoadableComponent(()=>import('../../routes/Other/LoadingDemo/index'))
const ErrorPage = LoadableComponent(()=>import('../../routes/Other/ErrorPage/index'))
const SpringText = LoadableComponent(()=>import('../../routes/Other/SpringText/index'))

//关于
const About = LoadableComponent(()=>import('../../routes/About/index'))

//错题
const Mistakes = LoadableComponent(()=>import('../../routes/Mistakes/index'))

//通知
const Notification = LoadableComponent(()=>import('../../routes/Notification/index'))
/*const NotificationPage = LoadableComponent(()=>import('../../routes/Notification/notificationpage'))*/


//课程
const CourseDemo = LoadableComponent(()=>import('../../routes/Course/index'))
const AddCourseDemo = LoadableComponent(()=>import('../../routes/Course/addCoursePage'))

//作业
const HomeworkDemo = LoadableComponent(()=>import('../../routes/Homework/index'))


//管理
  const Choosecourse=LoadableComponent(()=>import('../../routes/Manage/index'))
const Managecourse=LoadableComponent(()=>import('../../routes/Manage/courseset'))
const ManageStudent=LoadableComponent(()=>import('../../routes/Manage/change'))

@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>
          <PrivateRoute exact path='/home' component={Home}/>

          <PrivateRoute exact path='/home/notification' component={Notification}/>


          <PrivateRoute exact path='/home/general/button' component={ButtonDemo}/>
          <PrivateRoute exact path='/home/general/icon' component={IconDemo}/>

          <PrivateRoute exact path='/home/navigation/dropdown' component={DropdownDemo}/>
          <PrivateRoute exact path='/home/navigation/menu' component={MenuDemo}/>
          <PrivateRoute exact path='/home/navigation/steps' component={StepsDemo}/>

          <PrivateRoute exact path='/home/entry/form/basic-form' component={FormDemo1}/>
          <PrivateRoute exact path='/home/entry/form/step-form' component={FormDemo2}/>
          <PrivateRoute exact path='/home/entry/upload' component={UploadDemo}/>

          <PrivateRoute exact path='/home/display/carousel' component={CarouselDemo}/>
          <PrivateRoute exact path='/home/display/collapse' component={CollapseDemo}/>
          <PrivateRoute exact path='/home/display/list' component={ListDemo}/>
          <PrivateRoute exact path='/home/display/table' component={TableDemo}/>
          <PrivateRoute exact path='/home/display/tabs' component={TabsDemo}/>

          <PrivateRoute exact path='/home/feedback/modal' component={ModalDemo}/>
          <PrivateRoute exact path='/home/feedback/notification' component={NotificationDemo}/>
          <PrivateRoute exact path='/home/feedback/spin' component={SpinDemo}/>

          <PrivateRoute exact path='/home/other/animation' component={AnimationDemo}/>
          <PrivateRoute exact path='/home/other/gallery' component={GalleryDemo}/>
          <PrivateRoute exact path='/home/other/draft' component={DraftDemo}/>
          <PrivateRoute exact path='/home/other/chart' component={ChartDemo}/>
          <PrivateRoute exact path='/home/other/loading' component={LoadingDemo}/>
          <PrivateRoute exact path='/home/other/404' component={ErrorPage}/>
          <PrivateRoute exact path='/home/other/springText' component={SpringText}/>

          <PrivateRoute exact path='/home/about' component={About}/>
          <PrivateRoute exact path='/home/course/overall' component={CourseDemo}/>
          <PrivateRoute exact path='/home/course/ongoing' component={CourseDemo}/>
          <PrivateRoute exact path='/home/course/end' component={CourseDemo}/>
          <PrivateRoute exact path='/home/course/class*' component={CoursePageDemo}/>
          <PrivateRoute exact path='/home/course/addCourse' component={AddCourseDemo}/>

          <PrivateRoute exact path='/home/homework/overall' component={HomeworkDemo}/>
          <PrivateRoute exact path='/home/homework/submitted' component={HomeworkDemo}/>
          <PrivateRoute exact path='/home/homework/uncommitted' component={HomeworkDemo}/>
          <PrivateRoute exact path='/home/homework/closed' component={HomeworkDemo}/>
          <PrivateRoute exact path='/home/homework/notclosed' component={HomeworkDemo}/>

          <PrivateRoute exact path='/home/notification/page' component={NotificationPage}/>
          <PrivateRoute exact path='/home/mistakes' component={Mistakes}/>

          <PrivateRoute exact path='/home/manage/choosecourse' component={ChooseCourse}/>
          <PrivateRoute exact path='/home/manage/managecourse' component={Managecourse}/>
          <PrivateRoute exact path='/home/manage/managestudent' component={ManageStudent}/>

          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain
