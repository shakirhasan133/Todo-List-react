import PropTypes from "prop-types";
import delete_icon from "../img/delete.png";
import not_tick from "../img/not_tick.png";
import tick from "../img/tick.png";

const TodoList = ({ text, id, isComplete, handleDelete, toggle }) => {
  return (
    <div className="flex items-center mx-3 mt-4">
      <div
        onClick={() => toggle(id)}
        className="flex-1 flex items-center gap-2 cursor-pointer"
      >
        <img className="w-5" src={isComplete ? tick : not_tick} alt="" />
        <p className={`w-full mr-4 ${isComplete ? "line-through" : ""}`}>
          {text.text}
        </p>
      </div>
      <img
        onClick={() => handleDelete(id)}
        className="w-5 cursor-pointer"
        src={delete_icon}
        alt=""
      />
    </div>
  );
};

TodoList.propTypes = {
  text: PropTypes.object,
  id: PropTypes.number,
  isComplete: PropTypes.bool,
  handleDelete: PropTypes.func,
  toggle: PropTypes.func,
};
export default TodoList;
