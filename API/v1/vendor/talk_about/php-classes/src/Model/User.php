<?php

	namespace Talk\Model;

	use \Talk\Model;
	use \Talk\DB\Sql;

	class User extends Model
	{
		const SESSION = "User";
		protected $fields = ["id", "name", "user", "pass"];

		public function login($login, $pass)
		{
			$sql = new Sql();
			$user = $sql->select("SELECT * FROM users WHERE user = :LOGIN", array(
				":LOGIN"=>$login
			));

			if (count($user) === 0) {
				return array(
					"status"=>404,
					"message"=>"User not found"
				);
			}

			$data = $user[0];

			if ($pass == $data["pass"]) {
				$user = new User();
				$user->setData($data);
				$_SESSION[User::SESSION] = $user->getValues();

				return array(
					"status"=>200,
					"message"=>"User found",
					"user_id"=>$_SESSION[User::SESSION]['id'],
					"user_name"=>$_SESSION[User::SESSION]['user'],

				);

			} else {
				return array(
					"status"=>500,
					"message"=>"Could not login"
				);
			}
		}

		public function session()
		{
			return $_SESSION[User::SESSION]['id'];
		}
		
		public function saveUser()
		{
			$sql = new Sql();
			$userResult = $sql->select("SELECT user FROM users WHERE user = :USER", array(
				":USER"=>$this->getuser()
			));

			if (count($userResult) > 0) {
				return array(
					"status"=>10,//quando for 1 é por que já existe um usuario
					"message"=>"existing user"
				);
			} else {

				$result = $sql->select("CALL user_save(:NAME, :USER, :PASS)", array(
					":NAME"=>$this->getname(),
					":USER"=>$this->getuser(),
					":PASS"=>$this->getpass()
				));

				if (count($result) === 0) {
					return array(
						"status"=>500,
						"message"=>"Operation not completed"
					);
				} else {
					return array(
						"status"=>200,
						"message"=>"successful inserted"
					);
				}

			}
		}
	}

?>