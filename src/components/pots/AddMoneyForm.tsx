import { Pot } from "../../types";
import UpdateTotalSavedForm from "./UpdateTotalSavedForm";

interface AddMoneyFormProps {
    pot: Pot;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddMoneyForm = ({pot, setShowModal} : AddMoneyFormProps) => {
  return (
    <UpdateTotalSavedForm pot={pot} setShowModal={setShowModal} max_amount={pot.target - pot.total_saved} defaultAmount={400}/>
  )
}

export default AddMoneyForm;