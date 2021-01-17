import Button from "@material-ui/core/Button";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

export function IntroSlide(props) {
    return (
        <>
            <header>{props.title}</header>
            <div>{props.description}</div>
            {props.hasInput ? (
                <form id="intro-form" onSubmit={props.onSubmit}>
                    <FormControl required>
                        <InputLabel>{props.question}</InputLabel>
                        <OutlinedInput
                            id="intro-input"
                            label="Response"
                            variant="outlined"
                            color="primary"
                            size="small"
                            type="number"
                            endAdornment={
                                <InputAdornment position="end">{props.unit}</InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" color="secondary" type="submit">
                        Next
                    </Button>
                </form>
            ) : (
                <Button variant="contained" color="secondary" onClick={props.onClick}>
                    Next
                </Button>
            )}
        </>
    );
}
