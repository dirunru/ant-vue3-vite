<template>
	<div class="loader-106"></div>
</template>

<style lang='less' scoped>
@keyframes animloader106back {
	0%,
	30%,
	70% {
		transform: translateY(0px);
	}
	20%,
	40%,
	100% {
		transform: translateY(-5px);
	}
}

@keyframes animloader106 {
	0% {
		box-shadow: 4px 4px 12px 2px rgba(144, 207, 91, 0.75);
		width: 34px;
		height: 34px;
		background-position: -44px -44px;
		background-size: 100px 100px;
	}
	100% {
		box-shadow: 2px 2px 8px 0px rgba(144, 207, 91, 0.5);
		width: 30px;
		height: 28px;
		background-position: -36px -36px;
		background-size: 80px 80px;
	}
}

.loader-106 {
	margin: 50px auto;
	position: relative;
	width: 32px;
	height: 90px;
	margin-bottom: 20px;
	border-radius: 50% 50% 0 0;
	border-bottom: 10px solid #90cf5b;
	background-color: #00afee;
	background-image: radial-gradient(ellipse at center, #00afee 34%, #90cf5b 35%, #90cf5b 54%, #00afee 55%), linear-gradient(#90cf5b 10px, transparent 0);
	background-size: 28px 28px;
	background-position: center 20px, center 2px;
	background-repeat: no-repeat;
	-webkit-animation: animloader106back 1s linear infinite alternate;
	animation: animloader106back 1s linear infinite alternate;

	&::before {
		content: "";
		position: absolute;
		top: 67px;
		left: 50%;
		transform: translateX(-50%);
		width: 64px;
		height: 44px;
		border-radius: 50%;
		box-shadow: 0px 15px #90cf5b inset;
	}

	&::after {
		content: "";
		position: absolute;
		top: 112%;
		left: 50%;
		transform: translateX(-50%) rotate(45deg);
		width: 34px;
		height: 34px;
		background-image: radial-gradient(ellipse at center, #ffdf00 8%, rgba(144, 207, 91, 0.6) 24%, rgba(0, 0, 0, 0) 100%);
		border-radius: 50% 50% 0;
		background-repeat: no-repeat;
		background-position: -44px -44px;
		background-size: 100px 100px;
		box-shadow: 4px 4px 12px 0px rgba(144, 207, 91, 0.5);
		-webkit-animation: animloader106 1s linear infinite alternate;
		animation: animloader106 1s linear infinite alternate;
	}
}
</style>