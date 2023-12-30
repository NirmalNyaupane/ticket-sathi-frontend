import CustomTextArea from "@/components/common/CustomTextArea"
import { InputField } from "@/components/common/InputField"
import { Button } from "@/components/ui/button"

const CategoryModal = () => {
    return (
        <form className="space-y-3">
            <InputField label="Name" />
            <CustomTextArea
                label="Description"
            />
            <Button>Submit</Button>
        </form>
    )
}

export default CategoryModal