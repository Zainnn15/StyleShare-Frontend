export default function test1({n}) {
    if (n > 0) {
        return(
            <h1>
                The value of n is {n}
            </h1>
        )
    }
    else {
        return(
            <h2>
                The value is n is less than 0
            </h2>
        )
    }
}