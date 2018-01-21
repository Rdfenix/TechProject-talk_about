<?php

	namespace Talk\Model;

	use \Talk\Model;
	use \Talk\DB\Sql;

	class User extends Model
	{
		protected $fields = ["id", "name", "user", "pass"];

		public function saveUser()
		{
			$sql = new Sql();
			$userResult = $sql->select("SELECT user FROM users WHERE user = :USER", array(
				":USER"=>$this->getuser();
			));

			if (count($userResult) > 0) {
				return array(
					"status"=>1//quando for 1 é por que já existe um usuario
				);
			} else {

				$result = $sql->select("CALL user_save(:NAME, :USER, :PASS)", array(
					":NAME"=>$this->getname(),
					":USER"=>$this->getuser(),
					":PASS"=>$this->getpass()
				));

				if (count($result) === 0) {
					return array(
						"status"=>500
					);
				} else {
					return json_encode($result[0]);
				}

			}
		}
	}

?>