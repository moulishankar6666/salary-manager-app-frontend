import { MdSavings } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaHome } from "react-icons/fa";
import { RiDiscountPercentFill } from "react-icons/ri";

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

  const success = (user, groupname) => {
    const { Luxury, savings, housespend, userInfo } = user;
    const { salary } = userInfo;
    const deg = () => {
      switch (groupname) {
        case GroupsData[0].groupName:
          return housespend / ((salary / 100) * 50);
        case GroupsData[1].groupName:
          return savings / ((salary / 100) * 20);
        case GroupsData[2].groupName:
          return Luxury / ((salary / 100) * 30);
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
          {status === apiStatus.success ? `${parseInt(deg() * 100)}%` : `${5}%`}
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

  // spend Group
  const eachGroup = (group) => {
    const { user } = props.data;

    return (
      <div key={group.groupName} className="spend-groups-container">
        <div className="spend-groups-left-container">
          <div className="left-image-container">{group.groupImg}</div>
          <div className="left-content-container">
            <p className="group-name">{group.groupName}</p>
            <p>{`${group.noofSpends} Spends`}</p>
          </div>
        </div>
        {status === apiStatus.success
          ? success(user, group.groupName)
          : loading()}
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
