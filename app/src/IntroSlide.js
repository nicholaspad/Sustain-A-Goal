import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";

export function IntroSlide(props) {
    return (
        <>
            {props.icon}
            <h2 id="intro-rec-title">{props.title}</h2>
            <div id="intro-rec-desc" className="center-text">
                {props.description}
            </div>
            {props.hasInput ? (
                <form id="intro-form" onSubmit={props.onSubmit}>
                    <div id="intro-form-question">{props.inputQuestion}</div>
                    <FormControl required>
                        <Input
                            id="intro-input"
                            label="Response"
                            color="primary"
                            size="small"
                            type="number"
                            endAdornment={
                                <InputAdornment position="end">{props.unit}</InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button
                        id="intro-input-next-button"
                        variant="contained"
                        color="secondary"
                        type="submit"
                    >
                        Next
                    </Button>
                </form>
            ) : (
                <Button
                    id="intro-next-button"
                    variant="contained"
                    color="secondary"
                    onClick={props.onClick}
                >
                    Next
                </Button>
            )}
        </>
    );
}
