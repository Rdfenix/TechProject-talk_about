<?php

	namespace Talk\Model;

	use \Talk\Model;
	use \Talk\DB\Sql;

	class Post extends Model
	{
		protected $fields = ["id", "title", "post", "user_id", "commentary", "post_id"];

		public function savePost()
		{
			$sql = new Sql();
			$result = $sql->select("CALL post_save(:TITLE, :POST, :USER_ID)", array(
				":TITLE"=>$this->gettitle(),
				":POST"=>$this->getpost(),
				":USER_ID"=>"2"
			));

			if (count($result) === 0) {
				return json_encode(array(
					"status"=>500
				));
			} else {
				return json_encode(array(
			       "status"=>200
			    ));
			}
		}

		public function getItem($id)
		{
			$sql = new Sql();
			$result = $sql->select("SELECT p.id, p.title, p.post, u.name, p.user_id, p.created_at FROM post p INNER JOIN users u ON p.user_id = u.id WHERE p.id = :ID", array(
				":ID"=>$id
			));
			if (count($result) === 0) {
				return json_encode(array(
					"status"=>500
				 ));
			} else {
				return json_encode($result[0]);
			}
		}
		
		public static function listPosts()
		{
			$sql = new Sql();
			return $sql->select("SELECT p.id, p.title, p.post, u.name, p.user_id, p.created_at FROM post p INNER JOIN users u ON p.user_id = u.id ORDER BY p.created_at DESC");
		}

		public function listComments($id)
		{
			$sql = new Sql();
			$result = $sql->select("SELECT r.id, r.commentary, u.name, r.created_at FROM reply_post r INNER JOIN users u ON r.user_id = u.id WHERE r.post_id = :ID ORDER BY r.created_at DESC", array(
				":ID"=>$id
			));
			if (count($result) === 0) {
				return json_encode(array(
					"status"=>500
				 ));
			} else {
				return json_encode($result);
			}
		}
	}

?>