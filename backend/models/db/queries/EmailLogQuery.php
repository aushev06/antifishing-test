<?php

namespace app\models\db\queries;

/**
 * This is the ActiveQuery class for [[\app\models\db\EmailLog]].
 *
 * @see \app\models\db\EmailLog
 */
class EmailLogQuery extends \yii\db\ActiveQuery
{
    /*public function active()
    {
        return $this->andWhere('[[status]]=1');
    }*/

    /**
     * {@inheritdoc}
     * @return \app\models\db\EmailLog[]|array
     */
    public function all($db = null)
    {
        return parent::all($db);
    }

    /**
     * {@inheritdoc}
     * @return \app\models\db\EmailLog|array|null
     */
    public function one($db = null)
    {
        return parent::one($db);
    }
}
