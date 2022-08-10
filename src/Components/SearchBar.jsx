import { useState, useEffect } from "react"
import axios from "axios"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';



export const SearchBar = () => {
    const [posts, setPosts] = useState([])
    const [searchCategory, setSearchCategory] = useState('')

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    useEffect(() => {
        const occupation = async () => {
            const res = await axios.get(`https://bluehelmetpro.herokuapp.com/worker`)
            setPosts(res.data)
        }
        occupation()
    }, [])

    console.log(posts)


    return (

        <>
            <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }} ></Box>
            <div style={
                {width:"70%",
                    margin:"auto"}}>
                {/* <h3>Search</h3> */}
                <input
                    style={{ width: "30%", height: "25px" }}
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchCategory(e.target.value)}
                />

            </div>
            <Card style={{
                width: "80%",
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                margin: "auto",
                marginTop: "20px",
            }}>
                {posts.filter((value) => {
                    if (searchCategory === "") {
                        return value;
                    } else if (
                        value.category.toLowerCase().includes(searchCategory.toLowerCase())
                    ) {
                        return value;
                    }
                })

                    .map((item) => (
                        <CardContent style={{
                            boxShadow:"rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
                            borderRadius: "10px",
                            width: "80%",
                            display: "grid",
                            gridTemplateColumns: "repeat(2,1fr)",
                            marginTop: "20px",
                            marginLeft: "40px",
                            marginBottom: "30px"

                        }}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {item.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {item.location}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {item.category}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {item.type}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                EXPERIENCE:
                                {item.experience}
                            </Typography>
                            <Typography variant="body2">
                                GENDER:
                                {item.gender}
                            </Typography>
                            <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        View Contact
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>NAME:<input/><br/>
        CONTACT:<input/><br/>
        EMAILID:<input/><br/></Typography>
      </Popover>
    </div>

                        </CardContent>))}
            </Card>

        </>
    )
}


const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);


