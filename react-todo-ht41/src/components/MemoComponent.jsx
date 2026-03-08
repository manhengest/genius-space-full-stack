import { useMemo } from "react";

const MemoComponent = ({numbers, name}) => {
    const calculateSum = (nums) => {
        console.log("Calculating sum...");
        return nums.reduce((acc, num) => acc + num, 0);
    };

    const sum = useMemo(() => calculateSum(numbers), [numbers]);
    // const sum = calculateSum(numbers);

    return (
        <div>
            <p>useMemo component</p>
            <div>
                <p>Sum: { sum }</p>
            </div>
            <div>
                <p>Name: { name }</p>
            </div>
        </div>
    );
}

export default  MemoComponent;