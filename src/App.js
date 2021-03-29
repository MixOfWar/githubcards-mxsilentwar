import './App.css';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	root: {
		background: 'rgba(100, 100, 100, 0.2)',
		border: '2px solid rgba(200, 0, 255, .5)',
	},
	cardOne: {
		background: 'rgba(200, 0, 255, .5)',
		color: 'white',
		maxWidth: '500px',
		boxShadow: '3px 3px 5px 2px rgba(200, 5, 225, .3)',
	},
	cardTwo: {
		background: 'rgba(200, 0, 255, .5)',
		color: 'white',
		maxWidth: '250px',
		margin: '10px auto',
		boxShadow: '3px 3px 5px 2px rgba(200, 5, 225, .3)',
	},
	buttons: {
		background: 'linear-gradient(45deg, purple 30%, blue 80%)',
		border: '2px solid rgba(200, 0, 255, .5)',
		color: 'white',
		margin: '25px auto',
	},
	input: {
		background: 'linear-gradient(45deg, purple 30%, blue 80%)',
		border: '2px solid rgba(200, 0, 255, .5)',
		borderRadius: '5px',
		color: 'white',
		margin: '25px auto',
		'& label': {
			color: 'white',
		},
		'& label.Mui-focused': {
			color: 'white',
		},
	},
});

function App() {
	const [user, setUser] = useState({});
	const [active, setActive] = useState(false);
	const [userInput, setUserInput] = useState('');
	const [searching, setSearching] = useState(false);
	const [searchUser, setSearchUser] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		fetch(`https://api.github.com/users/mxsilentwar`)
			.then((res) => res.json())
			.then((data) => setUser(data));
	}, []);

	const handleToggle = (e) => {
		e.preventDefault();
		setActive(!active);
	};

	const handleSearch = (e) => {
		setUserInput(e.target.value);
	};

	const searchGithubUsers = (e) => {
		e.preventDefault();
		if (userInput !== '') {
			fetch(`https://api.github.com/search/users?q=${userInput}`)
				.then((res) => res.json())
				.then((data) => setSearchUser(data.items));
			setSearching(!searching);
			setUserInput('');
		}
	};

	return (
		<div className='App'>
			<header>
				<h1>Welcome to Github Cards by MxSilentWar</h1>

				{active ? (
					<Button
						className={classes.buttons}
						size='large'
						variant='outlined'
						onClick={(e) => handleToggle(e)}
					>
						<VisibilityOffIcon />
						Hide Creator
					</Button>
				) : (
					<Button
						className={classes.buttons}
						size='large'
						variant='outlined'
						onClick={(e) => handleToggle(e)}
					>
						<VisibilityIcon />
						Show Creator
					</Button>
				)}
			</header>

			<div className='creator'>
				{active ? (
					<Card className={classes.cardOne}>
						<CardContent>
							<CardMedia
								style={{ height: '200px', width: '200px', margin: 'auto' }}
								component='img'
								height='200'
								image={user.avatar_url}
								title={`${user.login} avatar`}
							/>
							<Typography className='title'>{user.login}</Typography>
							<Typography className='title'>{user.name}</Typography>
							<Typography className='bio'>{user.bio}</Typography>
						</CardContent>
					</Card>
				) : null}
			</div>

			<div className='searchMenu'>
				<TextField
					className={classes.input}
					size='small'
					type='text'
					id='userSearch'
					variant='filled'
					label='Input username here'
					value={userInput}
					onChange={(e) => handleSearch(e)}
					onKeyDown={(e) => {
						if (e.keyCode === 13) {
							searchGithubUsers(e);
						}
					}}
				/>
				<Button
					className={classes.buttons}
					size='large'
					variant='outlined'
					onClick={(e) => searchGithubUsers(e)}
				>
					<SearchIcon />
					Search for user
				</Button>
			</div>

			<div className='searched'>
				{searching
					? searchUser &&
					  searchUser.map((searched) => (
							<Card className={classes.cardTwo} key={searched.id}>
								<CardContent>
									<CardMedia
										style={{ height: '200px', width: '200px' }}
										component='img'
										height='200'
										width='250'
										image={searched.avatar_url}
										title={`${searched.login} avatar`}
									/>
									<Typography className='title'>{searched.login}</Typography>
									<Typography className='github'>
										<a href={searched.html_url}>{searched.html_url}</a>
									</Typography>
								</CardContent>
							</Card>
					  ))
					: null}
			</div>
		</div>
	);
}

export default App;
