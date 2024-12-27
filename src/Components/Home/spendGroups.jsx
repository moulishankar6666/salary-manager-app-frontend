import { MdSavings } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";

import Skeleton from "./skeletonLoading";

const GroupsData = [
  {
    groupName: "House Expences",
    groupImg: <FaHome />,
    noofSpends: 23,
    spendTypeImg: "path",
  },
  {
    groupName: "Savings",
    groupImg: <MdSavings />,
    noofSpends: 2,
    spendTypeImg: "path",
  },
  {
    groupName: "Luxury",
    groupImg: <IoFastFood />,
    noofSpends: 15,
    spendTypeImg: "path",
  },
];

const apiStatus = {
  Initial: "INITIAL",
  loading: "LOADING",
  success: "SUCCESS",
  failure: "FAILURE",
};

const SpendGroups = (props) => {
  const { status } = props.data;

  const success = (groupname) => {
    const { user } = props.data;
    const { Luxury, savings, housespend, userInfo } = user;
    const { salary } = userInfo;
    const deg = () => {
      switch (groupname) {
        case GroupsData[0].groupName:
          return housespend[0] / ((salary / 100) * 50);
        case GroupsData[1].groupName:
          return savings[0] / ((salary / 100) * 20);
        case GroupsData[2].groupName:
          return Luxury[0] / ((salary / 100) * 30);
        default:
          break;
      }
    };

    return (
      <div
        className="spend-groups-right-container"
        style={
          deg() * 100 < 90
            ? deg() * 100 < 70
              ? {
                  background: `conic-gradient(
      #2e0776 ${parseInt(deg() * 360)}deg,
      #80808067 90deg
    )`,
                }
              : {
                  background: `conic-gradient(
       darkorange ${parseInt(deg() * 360)}deg,
      #80808067 90deg
    )`,
                }
            : {
                background: `conic-gradient(
        #cd0707 ${parseInt(deg() * 360)}deg,
        #80808067 90deg
      )`,
              }
        }
      >
        <div className="spend-groups-right-inner-container">
          {parseInt(deg() * 100)}
        </div>
      </div>
    );
  };

  const loading = (user) => {
    return (
      <div
        className="spend-groups-right-container"
        style={{
          background: `conic-gradient(#000 ${360}deg, #514e4e89 90deg)`,
        }}
      >
        <div className="spend-groups-right-inner-container">
          {status === apiStatus.loading && (
            <RiDiscountPercentFill size={25} className="Percentage" />
          )}
        </div>
      </div>
    );
  };

  const TaskCount = (group) => {
    const { user } = props.data;
    const { Luxury, savings, housespend } = user;

    const taskCount =
      group.groupName === GroupsData[0].groupName
        ? housespend[1]
        : group.groupName === GroupsData[1].groupName
        ? savings[1]
        : Luxury[1];

    return <p>{`${taskCount} Spends`}</p>;
  };

  // spend Group
  const eachGroup = (group) => {
    return (
      <div key={group.groupName} className="spend-groups-container">
        <div className="spend-groups-left-container">
          <div className="left-image-container">{group.groupImg}</div>
          <div className="left-content-container">
            <p className="group-name">{group.groupName}</p>
            {status === apiStatus.success ? TaskCount(group) : <Skeleton />}
          </div>
        </div>
        {status === apiStatus.success ? success(group.groupName) : loading()}
      </div>
    );
  };

  return (
    <div className="spend-groups-main-container">
      <h3>Spend Groups</h3>
      {GroupsData.map((group) => eachGroup(group))}
    </div>
  );
};
export default SpendGroups;
