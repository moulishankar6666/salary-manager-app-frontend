import { MdSavings } from "react-icons/md";
import { IoFastFood } from "react-icons/io5";
import { FaHome } from "react-icons/fa";

const GroupsData = [
  {
    groupName: "House Expences",
    groupImg: <FaHome />,
    noofSpends: 23,
    spendTypeImg: "path",
    percentage: 85,
  },
  {
    groupName: "Savings",
    groupImg: <MdSavings />,
    noofSpends: 2,
    spendTypeImg: "path",
    percentage: 100,
  },
  {
    groupName: "Luxury",
    groupImg: <IoFastFood />,
    noofSpends: 15,
    spendTypeImg: "path",
    percentage: 50,
  },
];

const SpendGroups = () => {
  // spend Group
  const eachGroup = (group) => {
    return (
      <div key={group.groupName} className="spend-groups-container">
        <div className="spend-groups-left-container">
          <div className="left-image-container">{group.groupImg}</div>
          <div className="left-content-container">
            <p className="group-name">{group.groupName}</p>
            <p>{`${group.noofSpends} Spends`}</p>
          </div>
        </div>
        <div className="spend-groups-right-container">
          <div className="spend-groups-right-inner-container">
            {`${group.percentage}%`}
          </div>
        </div>
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
