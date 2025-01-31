import { Pot } from "../../types";
import UpdateTotalSavedForm from "./UpdateTotalSavedForm";

interface WithdrawMoneyFormProps {
    pot: Pot;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const WithdrawMoneyForm = ({pot, setShowModal} : WithdrawMoneyFormProps) => {
  return (
    <UpdateTotalSavedForm pot={pot} setShowModal={setShowModal} maxAmount={pot.totalSaved} defaultAmount={50} isWithdraw={true}/>
  )
}

export default WithdrawMoneyForm;